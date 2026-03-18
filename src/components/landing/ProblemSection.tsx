export default function ProblemSection() {
  return (
    <section className="bg-[#0c1222] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-medium text-violet-400/70 uppercase tracking-widest mb-8">
          The problem
        </p>

        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          <p className="text-zinc-300">
            Your website is{" "}
            <span className="text-white font-medium">three years old</span>.
            It doesn&apos;t show your current hours, your current services,
            or anything close to what you actually do now.
          </p>
          <p className="text-zinc-300">
            You paid an agency{" "}
            <span className="text-amber-400/90 font-medium">$5,000</span>{" "}
            to build it and{" "}
            <span className="text-amber-400/90 font-medium">$500/month</span>{" "}
            to maintain it. For most local businesses, that math
            stopped working a long time ago.
          </p>
          <p className="text-zinc-300">
            Meanwhile, potential customers Google you, find a competitor with
            a better site, and book there instead.{" "}
            <span className="text-zinc-500">
              You never even know it happened.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
