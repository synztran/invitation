import { motion } from "framer-motion";
import NextImage from "next/image";

interface MobileWarningProps {
	onContinue?: () => void;
	showContinueButton?: boolean;
}

const MobileWarning = ({
	onContinue,
	showContinueButton = false,
}: MobileWarningProps) => {
	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}>
			<motion.div
				className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full text-center"
				initial={{ scale: 0.8, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				transition={{ duration: 0.4, ease: "easeOut" }}>
				{/* Phone Icon */}
				<motion.div
					className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
					initial={{ rotate: -10, scale: 0.8 }}
					animate={{ rotate: 0, scale: 1 }}
					transition={{
						delay: 0.2,
						duration: 0.5,
						type: "spring",
						bounce: 0.3,
					}}>
					<svg
						className="w-10 h-10 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>
				</motion.div>

				{/* Title */}
				<motion.h2
					className="text-2xl font-bold text-gray-900 mb-4"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.4 }}>
					Mobile Experience Required
				</motion.h2>

				{/* Message */}
				<motion.p
					className="text-gray-600 mb-6 leading-relaxed"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.4 }}>
					This wedding invitation is specially designed for mobile
					devices to provide the best experience. Please view this on
					your smartphone or tablet.
				</motion.p>

				{/* Instructions */}
				<motion.div
					className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.4 }}>
					<p className="text-sm text-gray-700 font-medium mb-2">
						📱 For the best experience:
					</p>
					<ul className="text-xs text-gray-600 space-y-1 text-left">
						<li>• Open this link on your mobile phone</li>
						<li>• Rotate your device to portrait mode</li>
						<li>• Enjoy the interactive invitation</li>
					</ul>
				</motion.div>

				{/* Continue Button (optional) */}
				{showContinueButton && (
					<motion.button
						onClick={onContinue}
						className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 active:scale-95"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.4 }}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}>
						Continue Anyway
					</motion.button>
				)}

				{/* Footer */}
				<motion.p
					className="text-xs text-gray-400 mt-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7, duration: 0.4 }}>
					Hai & Giang Wedding Invitation
				</motion.p>
			</motion.div>
		</motion.div>
	);
};

export default MobileWarning;
