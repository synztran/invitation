import { motion } from "framer-motion";

const TITLE = "PASSPORT";
const SUBTITLE = "WEDDING INVITATION";

const shineVariants = {
	initial: { x: "-120%" },
	animate: {
		x: ["-120%", "120%"],
		transition: {
			repeat: Infinity,
			repeatType: "loop",
			duration: 3.2, // slower for softer feel
			ease: "easeInOut",
			delay: 0.7,
		},
	},
};

const TitleNsub = () => {
	return (
		<motion.div
			className="relative bg-clip-text text-transparent row-span-1 max-h-max"
			initial={{ scale: 0.98, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{
				duration: 1,
				ease: "easeOut",
				delay: 0.2,
			}}>
			{/* Animated Shine Effect */}
			<motion.span
				className="pointer-events-none absolute left-0 top-0 w-full h-full z-10"
				// variants={shineVariants}
				initial="initial"
				animate="animate">
				<span className="block w-40 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-2xl opacity-50" />
			</motion.span>
			{/* Sparkle Top Left */}
			<motion.span
				className="absolute left-2 top-2 w-7 h-7 pointer-events-none z-10"
				initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
				animate={{
					opacity: [0, 0.4, 0],
					scale: [0.8, 1.05, 0.8],
					rotate: [0, 90, 180],
				}}
				transition={{
					repeat: Infinity,
					repeatType: "loop",
					duration: 3.2,
					delay: 0.3,
				}}>
				<span className="block w-full h-full bg-[var(--main-color)]/10 rounded-full blur-2xl opacity-50" />
			</motion.span>
			{/* Sparkle Bottom Right */}
			<motion.span
				className="absolute right-2 bottom-2 w-7 h-7 pointer-events-none z-10"
				initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
				animate={{
					opacity: [0, 0.4, 0],
					scale: [0.8, 1.05, 0.8],
					rotate: [0, 90, 180],
				}}
				transition={{
					repeat: Infinity,
					repeatType: "loop",
					duration: 3.2,
					delay: 1.3,
				}}>
				<span className="block w-full h-full bg-[var(--main-color)]/10 rounded-full blur-2xl opacity-50" />
			</motion.span>
			<motion.div
				className="text-6xl text-center leading-[1.1] font-semibold text-[#2A5F4D] drop-shadow-[0_1.5px_0_#c0c0c0] relative z-20"
				style={{ letterSpacing: "0.03em" }}
				initial={{ scale: 0.95, opacity: 0, y: -18, rotate: -4 }}
				animate={{
					scale: [1.05, 1, 1.01, 1],
					opacity: 1,
					y: [-18, 6, 0, -2, 0],
					rotate: [-4, 1, 0, -1, 0],
				}}
				transition={{
					duration: 1.5,
					ease: [0.22, 1, 0.36, 1],
					delay: 0.25,
				}}>
				{TITLE}
			</motion.div>
			<motion.div
				className="text-xl w-full text-center font-medium text-[#2A5F4D] tracking-wide relative z-20"
				initial={{ opacity: 0, y: 14, letterSpacing: "0.15em" }}
				animate={{
					opacity: 1,
					y: [14, -2, 0],
					letterSpacing: ["0.15em", "0.04em", "0.08em"],
				}}
				transition={{
					duration: 1.3,
					ease: "easeOut",
					delay: 0.7,
				}}>
				{SUBTITLE}
			</motion.div>
		</motion.div>
	);
};

export default TitleNsub;
