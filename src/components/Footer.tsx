export default function Footer() {
  return (
    <footer className="bg-white text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">বাজার দর</h3>
            <p className="text-sm text-gray-400">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>
        </div>

        {/* Right side */}
        <p className="text-sm text-gray-400 text-center md:text-right max-w-md">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
