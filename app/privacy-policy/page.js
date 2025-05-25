// app/privacy-policy/page.js
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | UrBrandName",
  description: "Learn how UrBrandName collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Site header */}
      <Navbar />

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-2xl font-bold mb-8 mt-8 text-center">
          Privacy Policy
        </h1>

        <section className="space-y-6 leading-relaxed text-justify">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            fringilla, ipsum in porta cursus, neque sem sagittis urna, vitae
            tincidunt lectus magna ac dolor. Integer quis leo mauris. Nullam sit
            amet ligula ullamcorper, venenatis lectus id, pulvinar tortor.
          </p>

          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Mauris viverra, urna sit amet varius
            tincidunt, sem massa cursus velit, sit amet consectetur justo leo
            ut eros. Nam quis tellus ultricies, pulvinar odio vel, fermentum
            lectus.
          </p>

          <p>
            Donec pulvinar malesuada arcu, quis luctus ligula pretium eu.
            Suspendisse potenti. Duis lobortis finibus ipsum, nec ullamcorper
            felis sodales vel. Curabitur ullamcorper mauris vel mauris viverra,
            a pulvinar erat pellentesque. Integer malesuada porta risus, id
            semper nisi tristique in.
          </p>

          <p>
            Curabitur tempor venenatis leo, vitae mollis lorem ultrices eget.
            Sed a nulla dignissim, volutpat magna sed, sagittis lorem. Integer
            a massa velit. Quisque rhoncus ante sit amet dignissim viverra.
            Suspendisse volutpat, magna ac fermentum facilisis, ex nulla porta
            orci, sed accumsan libero lorem quis lorem.
          </p>

          <p>
            Aliquam in ex in justo laoreet finibus in nec felis. Sed sed diam
            vel mi sollicitudin sagittis. Praesent rutrum purus id tellus
            sodales, vitae condimentum ipsum malesuada. Morbi vulputate placerat
            massa, in laoreet nibh sagittis non.
          </p>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </>
  );
}
