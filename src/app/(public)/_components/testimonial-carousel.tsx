// src/app/(public)/_components/testimonial-carousel.tsx
"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  name: string;
  text: string;
}

// Real Google reviews for Atlantic Tires, Rims & Auto Repair, as written by the customers.
const testimonials: Testimonial[] = [
  { name: "Eddie Ortiz", text: "I've been working with Issac he is awesome! He was professional and polite with all of his customers. What took me away is how quick him and his team was, they get work done fast but efficient. Must stop shop if in need of new wheels, tires, or just repair! Thank you!" },
  { name: "A C", text: "Amazing customer service from amazing mechanics! They really take care of you. I've been coming here for about 10years, only for tires. Today they took care of much needed repairs for me and did not charge as much as others. I'm so grateful" },
  { name: "Christina Huber", text: "Chris is the man up there every time I need a tire I go there. He's very fast efficient and gives me a great price! I love this place!!!" },
  { name: "Hadi Makhlouf", text: "Great service, had to test my AC twice and didn't charge me a penny because the compressor was faulty, everywhere else wanted 80 for the Diagnosis. The staff are very friendly, and from what else I saw going on, efficient, and cost effective. 100% will be doing all my work here." },
  { name: "Mohamed Mawri", text: "In and out in no time, very friendly faces, I'm definitely going to recommend to family and friends. They honored their warranty unlike other shops. My A/C compressor went bad and I didn't realize it was still under warranty until the manager informed me. They replaced it at no charge for part and very affordable labor." },
  { name: "Dayan Milanes", text: "Best tire place I have ever been to! Chris has helped me from day one! Very fast, efficient, and pleasant place to go. Thank you so much for your help Chris! Ask for Chris to help you! He will do it with a smile on his face!" },
  { name: "Matthew Summers", text: "Had a slow leak, decided to just air it up and deal with it in a few days, on my way to an appointment I got a notice from my truck that my psi were low and dropping fast. Luckily I was just down the street, so I headed in and they got my patched up super quick and got to my appointment just a little late. Thanks again guys." },
  { name: "Nataishe C", text: "Great service always have been going here for years. They won't just take your money and leave you with more problems like most car places they actually fix the issue and they do it right and for a great price have been going here for 10 years and I love it!" },
  { name: "Prettie Beats", text: "Needed an emergency tire change before my trip the very next morning. I went to almost every tire shop you could think of & they couldn't help. I called Atlantic tires last minute & Chris said to come in & he took amazing care of us! Ended up needing two tires & Chris made sure to give us an amazing deal! He was heaven sent 10/10!" },
  { name: "Ronda Hernandez", text: "Really great customer service and prices. I drove in with a nail in my tire, was patched and ready to drive off in less than 15 min." },
  { name: "Mrs Smith", text: "Mr Isaac you sir are the boss. One of the best tire shops in Jax and auto repair. Affordable and quick. Any mistakes they make they fix too. Guaranteed work. All you guys thank you so much for helping us the past couple of weeks." },
  { name: "Meshadae A Nesmith", text: "We came in from out of town, and these gentlemen took great care of my family. We came in, and they serviced our car immediately to get us on our way with our small child." },
  { name: "C S", text: "Awesome service. Called at 4pm, got there at 5pm, had 4 nice used tires and shiny rims by 6pm. Great price cool guys" },
  { name: "Khadijah Fitch", text: "Been coming to this place since I moved to Jax 6 years ago. Wouldn't take my car nowhere else and I have a new 2025 Honda Accord." },
  { name: "Kayla Baker", text: "Helped us get the tires we needed, didn't even have to wait long. Honest and good workers with amazing customer service." },
  { name: "Vesper Dobbs", text: "The service repair guy was fast, courteous, and friendly. He fixed the problems I had with both tires and I didn't even have to get out of the car." },
  { name: "Loretta Mercy", text: "Isaac, the owner is so concerned about his customers. His brother is very professional! I've been going to him for years, my daughter also. I highly recommend this place!!!" },
  { name: "Titus Mason", text: "The service beyond spectacular. The gentleman name Chris greeted me with a smile and was pleasant and patient with me. I will be a return customer" },
  { name: "Jordan Lawson", text: "Stopped in to get a used tire. They took care of business quickly and fairly. Gave me what I asked for. Price is also fair." },
  { name: "Jeffrey Schwartz", text: "Very helpful and friendly staff. Price lower than expected and done a couple hours faster than expected. Really good people." },
  { name: "ItsyourgirlDee", text: "Best tire shop in Jacksonville. Professional, kind, with great pricing. Stop by today for all your tire and mechanical requirements!!" },
  { name: "Kevin Holgerson", text: "Great guys, very friendly, fair prices, they have been my go to guys for used tires for a few years now." },
  { name: "Almir Mehanovic", text: "What a team of great people. Mechanics went above and beyond to make this experience excellent. I will continue to bring my Jeep SRT8 here." },
  { name: "Olsi Bejko", text: "The best service and price in Jax, great customer service, very helpful and great price. Been coming here for over 5 years and will continue." },
  { name: "Michelle Williams", text: "Always nice people and great service. My number 1 stop for used tires and tire patches. Thanks guys!!" },
  { name: "Beth Chism", text: "They are super nice. The prices are great. The service was fast. What more can you ask for?" },
  { name: "Aubry Oden", text: "They are honest and trusting and will always give you a DEAL FOR THE PRICE. That's important for people who wanna trust that the work will be done right." },
  { name: "Katie Derringer", text: "Great experience; very fair pricing for really good work. I will definitely be a repeat customer." },
  { name: "Sandy Sinkhorn", text: "Awesome guys. Great mechanics. Great customer service. Nice looking used tires." },
  { name: "Hariwan Hagi", text: "Issac is the man. I love their friendly staff, great price on used/new tires and also available here is oil changes and a whole lot more!" },
  { name: "Lumarc Junior Petiton", text: "That's the really great place to take your car. Very friendly, fast and so many more good things." },
  { name: "Grace Osteen", text: "The most trusted mechanic I've ever been to." },
  { name: "Rita Lyles", text: "They fixed my AC in one day. They were very efficient, professional, saved me money. You should give them a try." },
  { name: "Frank Garland", text: "They had what I needed at a fair and very good price and the staff was extremely polite. I had a good experience." },
  { name: "Brian Gaukel", text: "Best prices around on four tires, in and out in about an hour on a Friday afternoon. Couldn't be happier today." },
  { name: "Currahee", text: "Quick, easy, cheap. No upsale for things you don't need. Recommend." },
  { name: "Byron Stanley", text: "Came in and got work done. Was very professional and price was great." },
  { name: "Val-Deane Brown", text: "Very courteous and professional environment. I would recommend for your service." },
  { name: "Kenneth Demps", text: "The best customer service in the land, also the best mechanics in the world." },
  { name: "Jack Klotzner", text: "Great staff, very friendly and knowledgeable, good prices and good service." },
  { name: "Katerine Deras", text: "Great price and very fast and friendly service!!" },
  { name: "Cheryl", text: "Good customer service and the owner Isaac is very nice and reasonable." },
  { name: "Deanna Yochem Fugate", text: "Isaac and his crew are great! Happy with their work!" },
  { name: "Dominique Polite", text: "Great customer service, highly recommended. Ask for Rasheed and tell him Dominique sent you, thank me later!" },
];

const TestimonialCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4000 })]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="h-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
              <div>
                <div className="flex items-center mb-4">
                  <Image src="/images/google.png" alt="Google logo" width={20} height={20} className="mr-2" />
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={18} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-base leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
              <div>
                <p className="font-bold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">Google Review</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;