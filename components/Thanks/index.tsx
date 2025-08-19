import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThanksModalProps {
	open: boolean;
	onBackToLogin: () => void;
	customerName: string;
}

const THANKS_TEXT =
	"We are thrilled you accepted our wedding invitation\u0021 Your presence will make our special day even more joyful\u002e Thank you for your warm support\u2014we can\u0027t wait to share this moment with you\u0021";

// Sparkle animation for background
const Sparkle = ({
	style,
	delay = 0,
}: {
	style?: React.CSSProperties;
	delay?: number;
}) => (
	<motion.span
		initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
		animate={{
			opacity: [0, 1, 0],
			scale: [0.7, 1.2, 0.7],
			rotate: [0, 360, 0],
		}}
		transition={{
			duration: 2.5,
			repeat: Infinity,
			repeatDelay: 1.2 + delay,
			ease: "easeInOut",
			delay,
		}}
		style={{
			position: "absolute",
			...style,
			pointerEvents: "none",
			zIndex: 1,
		}}>
		<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
			<g filter="url(#sparkle-glow)">
				<path
					d="M16 4 L18 16 L28 16 L18 18 L16 28 L14 18 L4 16 L14 16 Z"
					fill="#a7f3d0"
					opacity="0.7"
				/>
			</g>
			<defs>
				<filter
					id="sparkle-glow"
					x="0"
					y="0"
					width="32"
					height="32"
					filterUnits="userSpaceOnUse">
					<feGaussianBlur stdDeviation="2" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>
		</svg>
	</motion.span>
);

function TypingText({ text, speed = 30 }: { text: string; speed?: number }) {
	const [displayed, setDisplayed] = useState("");

	useEffect(() => {
		setDisplayed("");
		if (!text) return;

		let i = 0;
		const interval = setInterval(() => {
			setDisplayed((prev) => {
				// Only append if not finished
				if (i < text.length) {
					const next = text.slice(0, i + 1);
					i++;
					return next;
				} else {
					clearInterval(interval);
					return prev;
				}
			});
		}, speed);

		return () => clearInterval(interval);
	}, [text, speed]);

	return (
		<span>
			{displayed}
			<span className="blinking-cursor">|</span>
			<style jsx>{`
				.blinking-cursor {
					animation: blink 1s steps(1) infinite;
				}
				@keyframes blink {
					0%,
					50% {
						opacity: 1;
					}
					51%,
					100% {
						opacity: 0;
					}
				}
			`}</style>
		</span>
	);
}

const modalVariants = {
	hidden: { opacity: 0, scale: 0.85, y: 60 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 320,
			damping: 22,
		},
	},
	exit: { opacity: 0, scale: 0.85, y: 60, transition: { duration: 0.3 } },
};

const confettiVariants = {
	initial: (i: number) => ({
		opacity: 0,
		y: -40,
		x: i % 2 === 0 ? -30 : 30,
		rotate: 0,
	}),
	animate: (i: number) => ({
		opacity: [0, 1, 0],
		y: [0, 80, 120],
		x: i % 2 === 0 ? [-30, 0, 30] : [30, 0, -30],
		rotate: [0, 180, 360],
		transition: {
			duration: 2.2,
			delay: 0.2 * i,
			repeat: Infinity,
			repeatDelay: 2.5,
		},
	}),
};

const Confetti = () => {
	const confettiColors = [
		"#fbbf24",
		"#f472b6",
		"#60a5fa",
		"#34d399",
		"#f87171",
		"#a78bfa",
	];
	return (
		<>
			{Array.from({ length: 8 }).map((_, i) => (
				<motion.div
					key={i}
					custom={i}
					variants={confettiVariants}
					initial="initial"
					animate="animate"
					className="absolute"
					style={{
						left: `${10 + i * 10}%`,
						top: i < 4 ? "0%" : "10%",
						width: 10,
						height: 10,
						borderRadius: "50%",
						background: confettiColors[i % confettiColors.length],
						zIndex: 2,
					}}
				/>
			))}
		</>
	);
};

const signatureVariants = {
	hidden: { opacity: 0, x: 40 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { delay: 1.2, duration: 0.7, type: "spring", bounce: 0.2 },
	},
};

const buttonVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { delay: 1.5, duration: 0.4, type: "spring", bounce: 0.3 },
	},
	whileHover: { scale: 1.07, boxShadow: "0 2px 16px 0 #a7f3d0" },
	whileTap: { scale: 0.97 },
};

const ThanksModal = ({
	open,
	onBackToLogin,
	customerName,
}: ThanksModalProps) => {
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
					{/* Sparkles in the background */}
					<Sparkle style={{ left: 30, top: 60 }} delay={0.2} />
					<Sparkle style={{ right: 40, top: 100 }} delay={0.7} />
					<Sparkle style={{ left: 80, bottom: 60 }} delay={1.1} />
					<Sparkle style={{ right: 60, bottom: 80 }} delay={1.5} />
					{/* Confetti */}
					<Confetti />
					<motion.div
						className="bg-white rounded-xl shadow-xl p-4 max-w-sm w-full flex flex-col items-start relative overflow-hidden"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit">
						<motion.div
							className="text-3xl mb-4 text-center font-bold text-green-600 mx-auto"
							initial={{ scale: 0.7, opacity: 0, rotate: -30 }}
							animate={{
								scale: [0.7, 1.2, 1],
								opacity: [0, 1, 1],
								rotate: [0, 20, 0],
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 18,
								delay: 0.2,
							}}>
							🎉
						</motion.div>
						<motion.div
							className="text-left w-full"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.5 }}>
							<motion.strong
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.7, duration: 0.4 }}
								className="text-xl">
								Dear {customerName},
							</motion.strong>
							<motion.div
								className="text-base text-left mb-4 min-h-[5em]"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.9, duration: 0.5 }}>
								<TypingText text={open ? THANKS_TEXT : ""} />
							</motion.div>
							<motion.strong
								className="signature-font text-5xl block"
								variants={signatureVariants}
								initial="hidden"
								animate="visible">
								Hai Tran & Giang Vo
							</motion.strong>
						</motion.div>
						<motion.button
							className="mt-2 px-6 py-2 rounded bg-[var(--main-color)] text-white font-semibold hover:opacity-80 transition mx-auto"
							onClick={onBackToLogin}
							variants={buttonVariants}
							initial="hidden"
							animate="visible"
							whileHover="whileHover"
							whileTap="whileTap">
							Back to Login
						</motion.button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ThanksModal;
