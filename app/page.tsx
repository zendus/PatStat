// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className={styles.intro}>
//           <h1>To get started, edit the page.tsx file.</h1>
//           <p>
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className={styles.secondary}
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }



import { Button } from "@/components/ui/FlatButton";
import { Heading, Text } from "@/components/ui/Typography";
import { Phone } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--color-dtb-1) 0%, var(--color-dtb-2) 100%)",
          padding: "96px var(--gutter)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <Heading level={1} color="var(--color-white)" style={{ marginBottom: 24 }}>
            Smart Analytics for <br />
            <span style={{ color: "var(--color-tc-3)" }}>Better Decisions</span>
          </Heading>
          <Text size="large" color="var(--color-dtb-4)" style={{ maxWidth: 600, margin: "0 auto 40px" }}>
            PatStat gives you the insights you need to understand your data and drive results.
          </Text>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="secondary" size="lg">
              Try Interactive Demo →
            </Button>
            <Button variant="outline" size="lg" icon={<Phone size={18} />} iconPosition="left"
              style={{ borderColor: "var(--color-white)", color: "var(--color-white)" }}>
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px var(--gutter)", background: "var(--color-white)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Heading level={2} style={{ marginBottom: 16 }}>
            Everything you need
          </Heading>
          <Text size="medium" style={{ marginBottom: 48, maxWidth: 540, margin: "0 auto 48px" }}>
            A complete toolkit for statistical analysis and reporting.
          </Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {[
              { title: "Real-time Analytics", desc: "Monitor your data as it happens with live dashboards." },
              { title: "Custom Reports", desc: "Build and export reports tailored to your needs." },
              { title: "Team Collaboration", desc: "Share insights and work together seamlessly." },
            ].map((feature) => (
              <div
                key={feature.title}
                style={{
                  background: "var(--color-tc-4)",
                  borderRadius: "var(--radius-lg)",
                  padding: 32,
                  textAlign: "left",
                  border: "1px solid var(--color-tc-3)",
                }}
              >
                <Heading level={3} style={{ marginBottom: 12 }}>
                  {feature.title}
                </Heading>
                <Text size="normal" color="var(--color-grey-1)">
                  {feature.desc}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}