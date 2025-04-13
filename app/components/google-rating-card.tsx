import { Star } from "lucide-react";

export default function GoogleRatingCard() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Green border at the top */}
        <div className="h-2 bg-green-500"></div>

        <div className="p-6">
          <div className="flex items-center space-x-4">
            {/* Google Logo SVG */}
            <div className="flex-shrink-0">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                  s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                  s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  fill="#FFC107"
                />
                <path
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                  C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  fill="#FF3D00"
                />
                <path
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                  c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  fill="#4CAF50"
                />
                <path
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                  c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <div className="flex-1">
              {/* Rating Text */}
              <h3 className="text-xl font-medium text-gray-600">
                Google Rating
              </h3>

              <div className="flex items-center mt-1">
                {/* Rating Number */}
                <span className="text-3xl font-bold text-amber-500 mr-2">
                  4.8
                </span>

                {/* Stars */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-yellow-400 text-yellow-400 w-6 h-6"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>

              {/* See all reviews link */}
              <a
                target="_blank"
                href="https://www.google.com/maps/place/Jatiluwih+Rice+Terraces/@-8.3703096,115.1264486,16z/data=!4m12!1m2!2m1!1sVillage,+Jl.+Jatiluwih+Kawan+No.Desa,+Jatiluwih,+Kec.+Penebel,+Kabupaten+Tabanan,+Bali+82152!3m8!1s0x2dd227ab020cd7fb:0x2f0f875ff3e6839a!8m2!3d-8.37031!4d115.131372!9m1!1b1!15sClxWaWxsYWdlLCBKbC4gSmF0aWx1d2loIEthd2FuIE5vLkRlc2EsIEphdGlsdXdpaCwgS2VjLiBQZW5lYmVsLCBLYWJ1cGF0ZW4gVGFiYW5hbiwgQmFsaSA4MjE1MlpXIlV2aWxsYWdlIGpsIGphdGlsdXdpaCBrYXdhbiBubyBkZXNhIGphdGlsdXdpaCBrZWMgcGVuZWJlbCBrYWJ1cGF0ZW4gdGFiYW5hbiBiYWxpIDgyMTUykgESdG91cmlzdF9hdHRyYWN0aW9u4AEA!16s%2Fg%2F11b6dfvgqz?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                className="text-gray-500 text-sm mt-1 inline-block"
              >
                See all our reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
