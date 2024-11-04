const BookTable = () => {
    return (
        <div className="w-full h-fit py-24 bgBookTable">
            <div className="max-w-[700px] flex flex-col items-start justify-center gap-4 px-32">
                <div className="flex flex-col items-start justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-[10px] h-[10px] bg-red"></div>
                        <p className="font-roboto text-[20px] font-bold leading-[32px] text-red">Book Now</p>
                    </div>
                    <h5 className="font-bebas text-[62px] font-bold leading-[62px] text-white uppercase">Book Your Table</h5>
                </div>
                <p className="font-roboto text-base font-normal leading-[24px] text-white">
                    Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
                </p>
            </div>
            <div className="flex flex-col items-start justify-center gap-8 mt-8 px-32">
                <div className="max-w-[635px] flex flex-col items-start justify-center gap-6">
                    <div className="w-full h-[46px] flex items-center justify-center gap-4">
                        <input type="text" placeholder="Your Name*" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border-[1px] border-[#E5E7EB]" />
                        <input type="email" placeholder="Your Email" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border-[1px] border-[#E5E7EB]" />
                    </div>
                    <div className="w-full h-[46px] flex items-center justify-center gap-4">
                        <input type="date" placeholder="Reservation Date" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border-[1px] border-[#E5E7EB]" />
                        <input type="text" placeholder="Total People" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border-[1px] border-[#E5E7EB]" />
                    </div>
                    <textarea
                        placeholder="Message"
                        rows={4}
                        className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border-[1px] border-[#E5E7EB]"></textarea>
                </div>
                <button className="common-btn">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default BookTable;