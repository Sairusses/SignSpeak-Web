import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold leading-tight text-blue-700 mb-6">
            Bridging Communication with{" "}
            <span className="text-blue-500">AI</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            SignSpeak is an AI-powered mobile app that translates sign language
            into spoken and written words — helping everyone communicate freely.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Button color="primary" radius="lg" size="lg">
              Try Demo
            </Button>
            <Button radius="lg" size="lg" variant="bordered">
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            alt="SignSpeak illustration"
            className="drop-shadow-xl rounded-2xl"
            height={400}
            src="/illustration-signspeak.png"
            width={500}
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-8 md:px-16 py-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-blue-700">
          Key Features
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Real-time Translation",
              desc: "Uses AI and MediaPipe to detect and translate sign language instantly.",
              icon: "🤖",
            },
            {
              title: "Multi-Language Support",
              desc: "Supports Tagalog, English, and FSL — for a truly inclusive experience.",
              icon: "🌍",
            },
            {
              title: "Accessible & Intuitive",
              desc: "Designed for both signers and non-signers with a friendly interface.",
              icon: "💬",
            },
          ].map((feature) => (
            <Card key={feature.title} shadow="sm">
              <CardBody className="text-center py-10">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-blue-600">
                  {feature.title}
                </h4>
                <p className="text-gray-500">{feature.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h3 className="text-3xl font-bold mb-4">Start Connecting Today</h3>
        <p className="text-lg mb-8 opacity-90">
          Experience communication without barriers.
        </p>
        <Button color="primary" size="lg" variant="shadow">
          Download App
        </Button>
      </section>

    </main>
  );
}
