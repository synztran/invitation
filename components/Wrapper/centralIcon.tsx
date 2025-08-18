import {
	AIRPLANE_IMAGE,
	ARROW_RIGHT,
	BOARDING_PASS,
	COMPASS_IMAGE,
	HEART_ICON,
} from "components/images";
import Image from "next/image";
import { motion } from "framer-motion";

interface IProps {
	onClick: () => void;
}

const CentralIcon = ({ onClick }: IProps) => {
	return (
		<motion.div
			className="row-span-8 h-full flex justify-center items-center relative"
			initial={{ opacity: 0, scale: 0.92, y: 32 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ duration: 0.9, ease: "easeOut" }}>
			<div className="col-span-8 h-full w-full">
				<div className="grid grid-rows-12 h-full">
					{/* Animated Heart */}
					<div className="row-span-1 relative w-full h-full flex justify-center items-end">
						<motion.div
							className="absolute"
							initial={{ scale: 1, y: 0 }}
							animate={{
								scale: [1, 1.1, 1],
								y: [0, -4, 0],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatType: "loop",
								ease: "easeInOut",
							}}>
							<Image
								src={HEART_ICON}
								alt="Heart"
								width={60}
								height={60}
							/>
						</motion.div>
					</div>
					{/* Animated Compass */}
					<div className="row-span-8 relative w-full h-full">
						<motion.div
							className="w-full h-full"
							initial={{ rotate: 0 }}
							animate={{ rotate: 360 }}
							transition={{
								repeat: Infinity,
								duration: 25,
								ease: "easeInOut",
							}}
							style={{ willChange: "transform" }}>
							<Image
								src={COMPASS_IMAGE}
								alt="Compass"
								fill
								objectFit="contain"
								className="w-full h-full"
							/>
						</motion.div>
					</div>
					{/* Animated Airplane */}
					<div className="row-span-1 relative w-full h-full flex justify-center">
						<motion.div
							className="absolute"
							initial={{ x: -5, y: 0, rotate: -5 }}
							animate={{
								x: [-5, 5, -5],
								y: [0, -6, 0],
								rotate: [-5, 5, -5],
							}}
							transition={{
								duration: 2.2,
								repeat: Infinity,
								repeatType: "loop",
								ease: "easeInOut",
							}}>
							<Image
								src={AIRPLANE_IMAGE}
								alt="Airplane"
								width={60}
								height={60}
							/>
						</motion.div>
					</div>
				</div>
			</div>
			<div className="absolute right-0 -bottom-3 flex gap-2">
				<motion.div
					initial={{ opacity: 0, x: 22 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 22 }}
					transition={{
						duration: 0.7,
						ease: "easeOut",
						repeat: Infinity,
						repeatType: "mirror",
						delay: 2,
					}}
					className="flex items-center gap-2 right-4 relative">
					<span className="text-[var(--main-color)] text-sm">
						your boarding pass
					</span>
					<Image
						src={ARROW_RIGHT}
						alt="Arrow Right"
						width={40}
						height={40}
					/>
				</motion.div>
				<motion.button
					onClick={onClick}
					className="relative bg-gradient-to-r from-[#c0c0c0] via-[#e0e0e0] to-[#c0c0c0] px-4 py-1 rounded-xl shadow-2xl hover:shadow-[0_8px_32px_rgba(42,95,77,0.25)] transition-all border-2 border-[var(--main-color)] group overflow-hidden"
					whileTap={{ scale: 0.93, rotate: -2 }}
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{
						delay: 2,
						duration: 0.6,
						// type: "spring",
						// bounce: 0.3,
					}}>
					{/* Sparkle effect */}
					<motion.span
						className="absolute left-0 top-0 w-full h-full pointer-events-none"
						initial={{ opacity: 0 }}
						animate={{ opacity: [0, 0.7, 0], x: [0, 60, 120] }}
						transition={{
							repeat: Infinity,
							repeatType: "loop",
							duration: 2.5,
							delay: 4,
						}}>
						<span className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white/40 rounded-full blur-lg opacity-70" />
					</motion.span>
					{/* Animated shine */}
					<motion.span
						className="absolute left-0 top-0 w-full h-full pointer-events-none"
						initial={{ x: "-100%" }}
						animate={{ x: ["-100%", "120%"] }}
						transition={{
							repeat: Infinity,
							repeatType: "loop",
							duration: 2.2,
							ease: "easeInOut",
							delay: 4,
						}}>
						<span className="block w-16 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent blur-md opacity-80" />
					</motion.span>
					<div className="flex items-center gap-2 z-10 relative">
						<Image
							src={BOARDING_PASS}
							alt="Boarding Pass"
							width={38}
							height={18}
							className="max-h-[32px] drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
						/>
					</div>
				</motion.button>
			</div>
		</motion.div>
	);
};

export default CentralIcon;
