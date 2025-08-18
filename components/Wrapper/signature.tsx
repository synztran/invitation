import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Signature = () => {
	const [displayText1, setDisplayText1] = useState("");
	const [displayText3, setDisplayText3] = useState("");
	const [done1, setDone1] = useState(false);
	const [done3, setDone3] = useState(false);

	const fullText1 = "Hai Tran";
	const fullText3 = "Giang Vo";

	useEffect(() => {
		let index1 = 0;
		let index3 = 0;

		const typeText1 = () => {
			if (index1 < fullText1.length) {
				setDisplayText1(fullText1.slice(0, index1 + 1));
				index1++;
				setTimeout(typeText1, 150);
			} else {
				setDone1(true);
			}
		};

		const typeText3 = () => {
			if (index3 < fullText3.length) {
				setDisplayText3(fullText3.slice(0, index3 + 1));
				index3++;
				setTimeout(typeText3, 150);
			} else {
				setDone3(true);
			}
		};

		typeText1();
		typeText3();
	}, []);

	return (
		<motion.div
			className="row-span-1 flex items-center justify-between leading-10"
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}>
			<span className="signature-font text-[65px] text-[#2A5F4D] relative min-w-[150px]">
				{displayText1}
				{!done1 && <span className="animate-pulse">|</span>}
			</span>
			<span className="signature-font text-[3rem] text-[#2A5F4D] relative min-w-[15px]">
				&amp;
			</span>
			<span className="signature-font text-[65px] text-[#2A5F4D] relative min-w-[165px]">
				{displayText3}
				{!done3 && <span className="animate-pulse">|</span>}
			</span>
		</motion.div>
	);
};

export default Signature;
