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
          onPress={() => window.open("/downloads/SignSpeak-Android.apk")}
        >
          Download APK
        </Button>

        <p className="text-gray-400 text-sm mt-3">
          Version 1.0.0 · Updated November 2025
        </p>

        {/* Phone Preview */}
        <div className="mt-12 relative w-full flex justify-center">
          <div className="bg-gradient-to-tr from-blue-100 to-blue-50 p-6 rounded-3xl shadow-lg">
            <img
              alt="SignSpeak App Preview"
              className="w-[250px] md:w-[300px] rounded-2xl shadow-md"
              src=""
            />
          </div>
        </div>
      </div>

      {/* Interactive Section */}
      <div className="max-w-4xl mt-20 text-center">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">
          See SignSpeak in Action
        </h2>
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
          onPress={() => window.open("/downloads/SignSpeak-Android.apk")}
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
