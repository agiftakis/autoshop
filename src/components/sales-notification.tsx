// src/components/sales-notification.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

// ---- Timing (milliseconds). Edit these four lines to change the rhythm. ----
const INITIAL_DELAY_MS = 5000;   // wait after page load before the first popup
const MIN_GAP_MS = 14000;        // shortest wait between popups
const MAX_GAP_MS = 33000;        // longest wait between popups
const VISIBLE_MS = 2000;         // how long each popup stays on screen

// 100 names, in the original order so /images/heads/headN.png still matches name N.
const names: string[] = [
  "Tim Jackson", "Jessica Ming", "Dennese Chen", "Eric Wu", "Michael Brown", "Sam Wilson", "James Tuwang", "Linda Chu", "Raylene Anderson", "Patricia Thomas",
  "Jannet Erickson", "Jacob White", "William Hong", "Mary Bartin", "Resse Zhou", "Sam Wong", "Josephene Wilcox", "Carl Robinson", "Chassey Clark", "Nick Lewis",
  "Tammy Lee", "Sammie Perez", "Danny Pong", "Bert Allen", "Paul Torez", "Donna Hernandez", "George Chan", "Herold Wright", "Kenneth Walters", "Carl Hill",
  "Sebrena Scott", "Dorothy Green", "Edward Adams", "Rob Ming", "Rameer Hamgeed", "Shane Nelson", "Perthy Ashreme", "Deborah Mitchell", "Mohhamed Satire", "Kirt Roberts",
  "Jassie Turner", "Cynthia Phillips", "Jeffrey Chan", "Laura Parker", "Frank Evans", "Angelo Lopez", "Gary Collins", "Brent Stewart", "Larry Sanchez", "Paul Zauo",
  "Justin Rogers", "Chase Kumar", "Scott Chan", "Noel Morgan", "Brenda Bell", "Christine Murphy", "Benjamin Bailey", "Randor Rivera", "Julia Cooper", "James Richardson",
  "Grace Cox", "Hank Huwang", "Patrick Wang", "Debra Chin", "Amir Chopra", "Amanda Gray", "Jerry Ramirez", "Francine James", "Henry Watson", "Jack Brooks",
  "Ashley Kelly", "Teresa Sanders", "Candice Price", "Ann Bennett", "Lisa Wang", "Joan Barnes", "Albert Ross", "Evelyn Wu", "Philip Coleman", "Kathryn Jenkins",
  "Suzie Ming", "Sara Powell", "Suzie Pong", "Jean Zang", "Louis Chin", "Alice Forbes", "Betty Washington", "Gloria Butler", "Wanda Simmons", "Chuck Zhang",
  "Vincent Gonzales", "Judy Ming", "Bobby Alexander", "Denny Wang", "Brent Griffin", "Mike Donalds", "Roy Hayes", "Dick Myers", "Linda Chow", "Lori Hamilton",
];

// 30 Jacksonville-area neighborhoods, assigned in rotation (name 1 → first, name 31 → first again).
const locations: string[] = [
  "Woodland Acres", "Arlington", "Regency", "Southside", "San Marco", "Riverside", "Avondale", "Mandarin", "Atlantic Beach", "Neptune Beach",
  "Jacksonville Beach", "Orange Park", "Northside", "Westside", "Baymeadows", "Deerwood", "Sandalwood", "Fort Caroline", "Englewood", "St. Nicholas",
  "Murray Hill", "Ortega", "Springfield", "Fleming Island", "Julington Creek", "Ponte Vedra", "Nocatee", "Oakleaf", "Argyle Forest", "Town Center",
];

// One of these is picked at random for every popup.
const actions: string[] = [
  "just got four new tires",
  "just booked an alignment",
  "just booked an oil change",
  "just got a flat repaired",
  "just picked up a set of used tires",
  "just booked a brake job",
  "just got their A/C serviced",
  "just had a rim repaired",
  "just booked a tire mount and balance",
  "just got a free brake inspection",
];

interface NotificationData {
  name: string;
  location: string;
  image: string;
  action: string;
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const buildNotification = (): NotificationData => {
  const i = Math.floor(Math.random() * names.length);
  return {
    name: names[i],
    location: locations[i % locations.length],
    image: `/images/heads/head${i + 1}.png`,
    action: pick(actions),
  };
};

const SalesNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState<NotificationData | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scheduleNext = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const gap = Math.floor(Math.random() * (MAX_GAP_MS - MIN_GAP_MS + 1)) + MIN_GAP_MS;

      timeoutRef.current = setTimeout(() => {
        setCurrent(buildNotification());
        setIsVisible(true);
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          scheduleNext();
        }, VISIBLE_MS);
      }, gap);
    };

    const initialTimer = setTimeout(scheduleNext, INITIAL_DELAY_MS);

    return () => {
      clearTimeout(initialTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!current) return null;

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 bg-white rounded-xl shadow-2xl p-4 w-80 transform transition-all duration-500 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image src={current.image} alt={current.name} width={60} height={60} className="rounded-full border-2 border-brand" />
        </div>
        <div className="ml-4 flex-grow">
          <p className="font-bold text-gray-800">{current.name}</p>
          <p className="text-sm text-gray-600">
            from {current.location} {current.action}.
          </p>
          <p className="text-xs text-gray-400 mt-1">a few minutes ago</p>
        </div>
        <button onClick={() => setIsVisible(false)} className="ml-2 self-start" aria-label="Dismiss">
          <X size={18} className="text-gray-400 hover:text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default SalesNotification;