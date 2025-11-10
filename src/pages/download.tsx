import { Button } from "@heroui/button";
import { Download } from "lucide-react";

export default function DownloadPage() {
  return (
    <section className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Hero Section */}
      <div className="max-w-3xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Download SignSpeak for Android
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Experience AI-powered sign language translation — bridging the gap
          between signers and non-signers in real-time.
        </p>

        <Button
          className="rounded-full px-6"
          color="primary"
          size="lg"
          startContent={<Download size={20} />}
          onPress={() => {
            const link = document.createElement("a");

            link.href =
              "https://drive.google.com/uc?export=download&id=1lCxWQde-bqvoj8_D5ZnLSr53-fZWNrAv";
            link.download = "SignSpeak.apk";
            link.click();
          }}
        >
          Download APK
        </Button>

        <p className="text-gray-400 text-sm mt-3">
          Version 1.0.0 · Updated November 2025
        </p>

        {/* Phone Feature Preview Grid */}
        <h2 className="text-3xl mt-10 font-semibold text-blue-600 mb-6">
          See SignSpeak in Action
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {[
            { file: "/public/sign_to_text.mp4", label: "Sign To Text" },
            { file: "/public/text_to_sign.mp4", label: "Text To Sign" },
            { file: "/public/sign_library.mp4", label: "Sign Library" },
            { file: "/public/dark_mode.mp4", label: "Dark Mode UI" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className="relative w-[180px] h-[360px] bg-black rounded-[2rem] shadow-xl border-[10px] border-black overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-black rounded-b-xl" />

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src={item.file}
                />
              </div>
              <p className="text-blue-600 font-medium text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Section */}
      <div className="max-w-4xl mt-20 text-center">
        <p className="text-gray-600 mb-8">
          Watch how SignSpeak recognizes hand gestures using AI and converts
          them into spoken or written words in English and Tagalog.
        </p>
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-md bg-gray-100">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video controls className="w-full h-full object-cover" src="" />
        </div>
      </div>

      {/* Footer Call-to-Action */}
      <div className="mt-24 flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">
          Start Communicating Smarter Today
        </h3>
        <Button
          className="rounded-full px-6"
          color="primary"
          size="lg"
          startContent={<Download size={20} />}
          onPress={() => {
            const link = document.createElement("a");

            link.href =
              "https://drive.google.com/uc?export=download&id=1lCxWQde-bqvoj8_D5ZnLSr53-fZWNrAv";
            link.download = "SignSpeak.apk";
            link.click();
          }}
        >
          Get SignSpeak for Android
        </Button>
        <p className="text-gray-400 text-sm mt-3">
          Compatible with Android 8.0 (Oreo) and above
        </p>
      </div>
    </section>
  );
}
