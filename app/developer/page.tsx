import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Developer() {
  return (
    <>
     
      <Head>
        <title>Rakibul Alam | Full Stack Developer Portfolio</title>
        <meta
          name="Rakibul Alam"
          content="Explore the photo gallery and portfolio of Rakibul Alam, a Full Stack Developer skilled in React, Next.js, Node.js, and MongoDB."
        />
        <meta
          name="keywords"
          content="Rakibul Alam, Full Stack Developer, React, Next.js, Portfolio, JavaScript, MERN Stack"
        />
        <meta name="author" content="Rakibul Alam" />
        <meta property="og:title" content="Rakibul Alam | Full Stack Developer" />
        <meta
          property="og:description"
          content="Browse Rakibul Alam's portfolio showcasing projects, skills, and achievements as a Full Stack Developer."
        />
        <meta property="og:image" content="/rakib.jpg" />
        <meta property="og:type" content="https://rakibul599.github.io/react-portfolio/" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        ডেভেলপারের তথ্য
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition group">
            {/* Image */}
            <div className="relative w-full h-56 bg-gray-100">
              <Image
                src="/rakib.jpg"
                alt="Rakibul Alam"
                fill
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Text */}
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-900">Rakibul Alam</h2>
              <p className="text-sm text-gray-600 mt-2">Full Stack Developer</p>

              {/* Portfolio link */}
              <Link
                href="https://rakibul599.github.io/react-portfolio/"
                target="_blank"
                className="mt-3 inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                View Portfolio →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
