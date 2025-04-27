
export default function SocialMedia(){
    return(
        <>
        <div className="px-6 py-12">
            <h2 className="text-3xl font-bold mb-6">Follow Us on Our Social Media</h2>
            <iframe
            src="https://bc06ec0a3b7e459d813776546c13db9b.elf.site/"
            style={{
            width: "600px",   // Set width for the iframe
            height: "300px",  // Set height (shorter so scrolling is needed)
            overflowX: "auto", // Enable horizontal scrolling
            whiteSpace: "nowrap", // Prevent content from wrapping
            border: "1px solid black",
            }}
            title="Horizontally Scrolling Iframe"
            />
            <iframe src="https://bc06ec0a3b7e459d813776546c13db9b.elf.site/" />
            <iframe src="https://10d740aa190b4d0eb0e620904e081e88.elf.site"/>
        </div>
        </>
    )
} 