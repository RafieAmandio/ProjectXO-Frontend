import Image from "next/image"

export default function PersonalityQuiz() {
  return (
    <div className="
        min-h-screen
        bg-[#F7FAFC]
        bg-[url('/images/background.svg')]  /* Reference your SVG in public folder */
        bg-no-repeat                   /* No repeated tiling */
        bg-center                      /* Center horizontally & vertically */
        bg-contain                     /* or bg-cover, depends on your desired sizing */
        px-4
        py-8
        md:px-8
    ">
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-16">
          <Image src="/logo.svg" alt="XO Logo" width={40} height={40} className="w-10 h-10" />
        </div>

        {/* Quiz Header */}
        <div className="mb-12">
          <h1 className="text-xl font-medium mb-4">Personality Quiz</h1>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#d1d1d1] rounded-full overflow-hidden">
            <div className="h-full bg-[#f26241] rounded-full" style={{ width: "6.67%" }}></div>
          </div>
          <p className="text-sm mt-2">Step 1 of 15</p>
        </div>

        {/* Questions */}
        <div className="space-y-16">
          {[1, 2, 3, 4].map((questionNumber) => (
            <div key={questionNumber} className="space-y-4">
              <h2 className="font-medium">Question {questionNumber}</h2>
              <p className="text-[#0d141c] mb-6">
                Kamu baru saja dipromosikan menjadi manajer tim baru di perusahaanmu. Hari pertama di posisi baru ini
                penuh dengan ekspektasi dan kesempatan untuk memperkenalkan ide-ide baru. Apa yang akan kamu lakukan?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option A */}
                <div className="bg-[#ffb494] rounded-2xl overflow-hidden border border-[#E0E0E0] flex">
                  <div className="flex items-center justify-center p-4">
                    <div className="bg-[#ff8e5e] rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-white font-medium">A</span>
                    </div>
                  </div>
                  <div className="bg-[#F7FAFC] p-4">
                    <p className="text-[#0d141c] text-sm">
                      Aku memutuskan untuk menghabiskan beberapa hari pertama untuk mengamati dan belajar dari tim,
                      berharap mendapatkan bantuan dari seorang senior.
                    </p>
                  </div>
                </div>

                {/* Option B */}
                <div className="bg-[#ffb494] rounded-2xl overflow-hidden border border-[#E0E0E0] flex">
                  <div className="flex items-center justify-center p-4">
                    <div className="bg-[#ff8e5e] rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-white font-medium">B</span>
                    </div>
                  </div>
                  <div className="bg-[#F7FAFC] p-4">
                    <p className="text-[#0d141c] text-sm">
                      Aku memutuskan untuk menghabiskan beberapa hari pertama untuk mengamati dan belajar dari tim,
                      berharap mendapatkan bantuan dari seorang senior.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-16">
          <button className="px-8 py-2 bg-[#ffb494] text-[#0d141c] rounded-xl">Previous</button>
          <button className="px-8 py-2 bg-[#e2eeda] text-[#0d141c] rounded-xl">Next</button>
        </div>
      </div>
    </div>
  )
}


