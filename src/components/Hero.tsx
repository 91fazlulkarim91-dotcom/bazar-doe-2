import { getBanglaDate } from "@/lib/utils";

export default function Hero() {
  const banglaDate = getBanglaDate();

  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1">
          <span className="badge badge-success badge-outline mb-3">
            {banglaDate}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের
            পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn btn-success text-white btn-md"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <div className="text-8xl md:text-9xl">🧺</div>
        </div>
      </div>
    </section>
  );
}
