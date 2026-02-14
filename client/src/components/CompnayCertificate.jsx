const CompanyCertificate = () => {
  const certificateUrl =
    "https://res.cloudinary.com/<your-cloud-name>/image/upload/v1234567890/certificate.pdf"; // replace with your actual Cloudinary link

  return (
    <section className="bg-[#0c0f14] py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl text-white font-bold mb-2">
          Company Registration
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 mb-10">
          Official Certificate of Incorporation
        </p>

        {/* Certificate Preview */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-md overflow-hidden rounded-xl shadow-xl hover:shadow-brand-blue transition">
            <img
              src="https://res.cloudinary.com/dyjvi61hm/image/upload/v1770563329/compnay-registeration-document_wsyikc.jpg"
              alt="Certificate Preview"
              className="w-full object-cover"
            />
          </div>

          {/* Download Button */}
          <a
            href={certificateUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-blue hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition"
          >
            Download Certificate
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompanyCertificate;
