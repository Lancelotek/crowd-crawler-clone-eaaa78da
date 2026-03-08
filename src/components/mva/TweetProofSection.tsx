import { motion } from "framer-motion";

const tweets = [
  {
    name: "Alex Chen",
    handle: "@alexbuilds",
    text: "This framework completely changed how I think about product launches.\n\nI built a 2k waitlist before writing a single line of code.",
    likes: 47,
    retweets: 12,
  },
  {
    name: "Maya Patel",
    handle: "@mayapatel",
    text: "Audience-first product development is massively underrated.\n\nMore founders should do this before building.",
    likes: 83,
    retweets: 24,
  },
  {
    name: "Daniel Kim",
    handle: "@danielbuilds",
    text: "Built my first profitable product thanks to audience validation.\n\nWish I knew this strategy years ago.",
    likes: 36,
    retweets: 9,
  },
  {
    name: "Sarah Lewis",
    handle: "@sarahcreates",
    text: "The Minimum Viable Audience idea just makes sense.\n\nDemand before product.",
    likes: 61,
    retweets: 18,
  },
];

const getInitials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("");

const TweetCard = ({ tweet, index }: { tweet: (typeof tweets)[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-card border border-border rounded-card p-6 hover:border-primary/30 hover:shadow-lg transition-all"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
        {getInitials(tweet.name)}
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground leading-tight">{tweet.name}</div>
        <div className="text-xs text-muted-foreground">{tweet.handle}</div>
      </div>
      {/* X logo */}
      <svg className="ml-auto w-4 h-4 text-muted-foreground/50 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </div>

    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line mb-4">
      {tweet.text}
    </p>

    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
        {tweet.likes}
      </span>
      <span className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>
        {tweet.retweets}
      </span>
    </div>
  </motion.div>
);

const TweetProofSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold text-primary mb-3 tracking-wide">Community Voices</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3">
            What Founders Are <span className="text-primary">Saying</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-[440px] mx-auto">
            Creators and founders using audience-first launch strategies.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-[720px] mx-auto">
          {tweets.map((tweet, i) => (
            <TweetCard key={i} tweet={tweet} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
          >
            See more discussions on
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TweetProofSection;
