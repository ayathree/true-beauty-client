

const About = () => {
    return (
        <div>
        <div className="mt-10 relative">
          <img className="object-cover w-full min-h-screen h-[10vh]" src="https://dominique.com/cdn/shop/files/Untitled_design_11.png?v=1737604265&width=1190" alt="" />
          <div className="absolute top-36 left-36">
          <p className="font-bold text-2xl capitalize">Introducing about </p>
          <p className="font-bold text-5xl capitalize mt-2">true beauty</p>
          </div>
        </div>
        <div className="mt-10 space-y-20">
          {/* 1 */}
          <div className="flex justify-center items-center gap-10">
            <div className="flex-1">
              <img src="https://dominique.com/cdn/shop/files/2_187f7b06-7a0f-4c94-a11f-4cb0a316b228.png?height=461&v=1687374445&width=700" alt="" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-rose-700">Positive Reinforcement</p>
              <p className="text-lg font-semibold mt-10 text-rose-700">It takes a lot of practice and intention to love yourself. That's why we promise always to include a motivational message on all our products! There are a lot of negative messages out there, and we encourage you to start every day with positivity.</p>
            </div>
          </div>
          {/* 2 */}
         <div className="flex justify-center flex-row-reverse items-center gap-10">
            <div className="flex-1">
              <img src="https://templates.g5plus.net/glowing-bootstrap-5/assets/images/banner/banner-11.jpg" alt="" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-rose-700">Transparency</p>
              <p className="text-lg font-semibold mt-10 text-rose-700">We believe it’s important to be comfortable with yourself and honest about who you are and what you value. Much of our product packaging is transparent to serve as a visual reminder to let your inner beauty shine. Makeup should enhance what you have! We believe it’s your personality that makes you unique and attractive.</p>
            </div>
          </div>
          {/* 3 */}
          <div className="flex justify-center items-center gap-10">
            <div className="flex-1">
              <img src="https://templates.g5plus.net/glowing-bootstrap-5/assets/images/banner/banner-12.jpg" alt="" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-rose-700">Simplicity</p>
              <p className="text-lg font-semibold mt-10 text-rose-700">We realize that you’re really busy– All. The. Time. That’s why we focus on making no-fuss products that are easy to use and multi-purpose. We never want you to be overwhelmed by your beauty routine. It should be a ritual that you enjoy.</p>
            </div>
          </div>
          {/* 4 */}
          <div className="flex justify-center flex-row-reverse items-center gap-10">
            <div className="flex-1">
              <img src="https://dominique.com/cdn/shop/files/about_us_images_2.jpg?height=815&v=1687376176&width=924" alt="" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-rose-700 capitalize">A note from our founder</p>
              <p className="text-lg font-semibold mt-10 text-rose-700">Like most, I grew up with insecurities that were hard to overcome mine where my under eye circles causing me to be shy and unable to connect. As a young teen, I wasn’t allowed to wear makeup but I grabbed my moms concealer anyway, put it on and went to school it was that day when everything changed for me: I felt beautiful, empowered, and confident.
                <br />

From then on for the first time I felt connected and I knew that I wanted everyone around me to feel the same sense of self love that I was able to redefine for myself.
<br />

I developed True Beauty Cosmetics E-commerce site to curate products that break the norms of today’s vanity, and shine a light on anyone who uses our and world's best products at accurate price. We believe in the strength of self-worth, and I know our products will help you feel the same.</p>
            </div>
          </div>

        </div>
        </div>
    );
};

export default About;