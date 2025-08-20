import {
	BARCODE_IMAGE,
	FINGERPRINT_ICON,
	LOCATION_IMAGE,
	SIMPLE_AIRPLAN,
} from "components/images";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { useRef } from "react";

const TITLE = "Hai & Giang";

interface IProps {
	customerName: string;
	onTear: () => void;
	isSubmittedForm: boolean;
}

const BoardingPass = ({
	customerName = "",
	onTear,
	isSubmittedForm,
}: IProps) => {
	const ref = useRef<HTMLDivElement>(null);
	return (
		<motion.div
			ref={ref}
			className={`h-full w-full flex bg-[url("/images/boarding_bg.webp")] overflow-auto`}
			initial={{ opacity: 0, scale: 0.97, y: 40 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ duration: 1, ease: "easeOut" }}>
			<div
				className="absolute top-0 left-0 z-10 bg-[url('/images/pastel_bg.jpeg')] bg-cover w-[1.5rem] h-full"
				style={{
					backgroundPositionX: "65%",
				}}
			/>
			<div className={`w-full relativ pt-2 grid grid-rows-12 h-full`}>
				<div className="relative pl-10 pr-12 pb-4 row-span-1">
					<motion.span
						className="relative text-left text-black text-6xl signature-font overflow-visible"
						style={{ lineHeight: 1, display: "inline-block" }}
						initial={{ opacity: 0, y: -30, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{
							delay: 0.2,
							duration: 0.7,
							type: "spring",
							bounce: 0.3,
						}}>
						<span className="relative z-10">{TITLE}</span>
					</motion.span>
					<motion.div
						className={`absolute top-14 -right-[2.4rem] bg-[url('/images/new_1_class_bg.webp')] bg-cover bg-no-repeat bg-center flex items-center justify-center font-bold text-base text-black w-[12.75rem] min-h-max rotate-90 z-[12] p-1`}
						initial={{ opacity: 0, x: 40, rotate: 80 }}
						animate={{ opacity: 1, x: 0, rotate: 90 }}
						transition={{
							delay: 0.5,
							duration: 0.7,
							type: "spring",
							bounce: 0.2,
						}}
						style={{ position: "absolute" }}>
						<span className="relative inline-block">
							<span className="relative z-10">
								Business Class
							</span>
						</span>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 z-20"
							style={{
								WebkitMaskImage:
									"linear-gradient(120deg, transparent 40%, white 50%, transparent 60%)",
								maskImage:
									"linear-gradient(120deg, transparent 40%, white 50%, transparent 60%)",
								background:
									"linear-gradient(120deg, rgba(255,255,255,0.0) 40%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.0) 60%)",
								animation:
									"shine-effect-business 2.2s linear infinite",
								display: "block",
							}}
						/>
						<style jsx>{`
							@keyframes shine-effect-business {
								0% {
									transform: translateX(-100%);
								}
								100% {
									transform: translateX(50%);
								}
							}
						`}</style>
					</motion.div>
					<motion.div
						className="absolute left-0 bottom-0 w-full border-b-4 border-dashed border-black z-[11]"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{
							delay: 0.7,
							duration: 0.6,
							ease: "easeOut",
						}}
						style={{ originX: 0 }}
					/>
				</div>
				<div className="flex flex-col w-full max-h-max row-span-8 pr-24 pt-4 pb-14 relative pl-6">
					<motion.div
						className="text-base"
						style={{
							writingMode: "vertical-rl",
						}}
						initial={{ opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							delay: 0.8,
							duration: 0.7,
							ease: "easeOut",
						}}>
						The Families of Hai Tran and Giang Vo
						<br />
						<span>cordially invite:</span>
						<div className="relative">
							<span>..................................</span>
							<strong className=" absolute text-black text-4xl signature-font leading-3">
								{customerName}
							</strong>
							<span>
								......................................................
							</span>
						</div>
						to join us in celebrating the joyous occasion of our
						wedding at our Private Residence
						<br />
						<span className="text-sm font-bold">
							56A2 Dong Khoi Street, Phu Tan Ward, Ben Tre (next
							to Phu Tan People's Committee)
						</span>{" "}
						<br />
						<span className="">At: 10:00 AM</span> <br />
						<span className="">
							Saturday, October 11, 2025
						</span>{" "}
						<br />
						<span className="text-gray-400 text-sm">
							(Corrected from June 23 (leap year) of the Year of
							the Snake)
						</span>
					</motion.div>
					<motion.div
						className="absolute bottom-2 left-0 w-full -translate-x-1/2 flex justify-center items-center"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: 1.2,
							duration: 0.7,
							ease: "easeOut",
						}}>
						<NextImage
							src={BARCODE_IMAGE}
							width={220}
							height={40}
							alt="barcode"
							className="max-h-[40px]"
						/>
						{/* Sparkle effect */}
						<motion.span
							className="absolute left-1/2 top-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
							initial={{ opacity: 0, scale: 0.7 }}
							animate={{
								opacity: [0, 0.7, 0],
								scale: [0.7, 1.1, 0.7],
							}}
							transition={{
								repeat: Infinity,
								repeatType: "loop",
								duration: 2.2,
								delay: 1.5,
							}}>
							<span className="block w-full h-full bg-white/40 rounded-full blur-lg opacity-70" />
						</motion.span>
					</motion.div>
				</div>
				<motion.div
					className="row-span-4 relative overflow-hidden flex flex-row-reverse gap-2"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}>
					<motion.div
						className="absolute w-full border-b-4 border-dashed border-black z-[11]"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{
							delay: 1.3,
							duration: 0.6,
							ease: "easeOut",
						}}
						style={{ originX: 1 }}
					/>
					<motion.div
						className="max-w-max min-w-[3rem] h-[90%] border-l border-b border-black mt-1 relative px-2 mr-12 py-2"
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							delay: 1.4,
							duration: 0.6,
							ease: "easeOut",
						}}>
						<div className="h-full flex flex-col items-center justify-center gap-12 relative z-[12]">
							<motion.div
								initial={{ rotate: 80 }}
								animate={{ rotate: 90 }}
								transition={{
									delay: 1.5,
									duration: 0.7,
									type: "spring",
									bounce: 0.2,
								}}>
								<NextImage
									src={LOCATION_IMAGE}
									width={30}
									height={30}
									alt="location"
								/>
							</motion.div>
							<motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{
									delay: 1.7,
									duration: 0.6,
									ease: "easeOut",
								}}>
								<NextImage
									src={SIMPLE_AIRPLAN}
									width={30}
									height={30}
									alt="airplane"
									className="rotate-90 scale-[1.2]"
								/>
							</motion.div>
						</div>
					</motion.div>
					<motion.div
						className="relative my-auto h-full flex items-center justify-center"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							delay: 1.6,
							duration: 0.7,
							type: "spring",
							bounce: 0.3,
						}}>
						<motion.div
							className="h-[7rem] w-[7rem] border border-black flex flex-col items-center justify-between p-1"
							style={{ writingMode: "vertical-rl" }}
							initial={{ rotate: 10 }}
							animate={{ rotate: 0 }}
							transition={{
								delay: 1.7,
								duration: 0.7,
								type: "spring",
								bounce: 0.2,
							}}>
							<span className="text-xl">Saturday</span>
							<strong
								className="text-[40px] font-bold"
								style={{ lineHeight: 1 }}>
								11
							</strong>
							<span className="text-xl tracking-wide">
								10.2025
							</span>
						</motion.div>
					</motion.div>
					<motion.div
						className="relative py-4 break-words text-center text-xs"
						style={{ writingMode: "vertical-rl" }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: 1.9,
							duration: 0.6,
							ease: "easeOut",
						}}>
						Your presence brings joy and happiness to our family.
					</motion.div>
					<motion.div
						className="grid grid-rows-2 text-center py-4"
						style={{ writingMode: "vertical-rl" }}
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							delay: 2.0,
							duration: 0.6,
							ease: "easeOut",
						}}>
						<div className="flex gap-2 text-xs items-baseline">
							<div className="w-full h-1/2 text-right">
								<strong>Welcome:</strong>
							</div>
							<strong className="w-full h-1/2">10:00 am</strong>
						</div>
						<div className="flex gap-2 text-xs items-baseline">
							<div className="w-full h-1/2 text-right">
								<strong>Party:</strong>
							</div>
							<strong className="w-full h-1/2">11:00 am</strong>
						</div>
					</motion.div>
					{!isSubmittedForm ? (
						<motion.button
							onClick={async (e) => {
								const btn = e.currentTarget;
								const fingerprint =
									btn.querySelector(".fingerprint");
								const scanBar = btn.querySelector(".scan-bar");
								if (fingerprint && scanBar) {
									fingerprint.classList.add("scanning");
									scanBar.classList.add("scanning");
									// Animate scan bar
									scanBar.animate(
										[
											{
												transform: "translateY(0%)",
												opacity: 1,
											},
											{
												transform: "translateY(100%)",
												opacity: 0.7,
											},
										],
										{
											duration: 700,
											easing: "cubic-bezier(.7,-0.2,.7,1.5)",
											fill: "forwards",
										}
									);
									// Animate fingerprint glow
									fingerprint.animate(
										[
											{
												filter: "drop-shadow(0 0 0px #00bcd4)",
												opacity: 1,
											},
											{
												filter: "drop-shadow(0 0 12px #00bcd4)",
												opacity: 1,
											},
											{
												filter: "drop-shadow(0 0 0px #00bcd4)",
												opacity: 0.7,
											},
											{
												filter: "drop-shadow(0 0 0px #00bcd4)",
												opacity: 0,
											},
										],
										{
											duration: 900,
											easing: "cubic-bezier(.7,-0.2,.7,1.5)",
											fill: "forwards",
										}
									);
								}
								btn.animate(
									[
										{
											filter: "brightness(1)",
											opacity: 1,
											transform: "scale(1)",
										},
										{
											filter: "brightness(1.2)",
											opacity: 1,
											transform: "scale(1.05)",
										},
										{
											filter: "brightness(1.5)",
											opacity: 0.7,
											transform: "scale(0.97)",
										},
										{
											filter: "brightness(2)",
											opacity: 0,
											transform: "scale(0.9)",
										},
									],
									{
										duration: 900,
										easing: "cubic-bezier(.7,-0.2,.7,1.5)",
										fill: "forwards",
									}
								);
								await new Promise((res) =>
									setTimeout(res, 900)
								);
								if (typeof onTear === "function") onTear();
							}}
							className="mx-auto mt-6 mb-2 ml-8 flex flex-col items-center gap-1 bg-white border border-dashed border-black rounded-full px-2 py-2 shadow hover:bg-gray-100 active:scale-95 transition-all relative overflow-hidden w-full max-w-xs"
							style={{ width: "100%" }}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{
								delay: 2.3,
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
							aria-label="Scan your finger to continue">
							<motion.span
								className="text-[8px] font-semibold tracking-widest text-gray-700"
								animate={{
									x: [0, -2, 2, -2, 2, 0],
									rotate: [0, -2, 2, -2, 2, 0],
								}}>
								Check point
							</motion.span>
							<span
								className="fingerprint flex items-center justify-center absolute top-1/2 -translate-y-[100%]"
								aria-hidden="true"
								style={{
									width: 32,
									height: 32,
									borderRadius: "50%",
									background: "#fff",
									position: "relative",
								}}>
								<motion.span
									className="flex flex-col items-center justify-center w-full h-full"
									aria-hidden="true"
									style={{ position: "relative", zIndex: 1 }}
									animate={{
										scale: [1, 1.15, 0.95, 1.1, 1],
										rotate: [0, -6, 6, -4, 4, 0],
									}}
									transition={{
										repeat: Infinity,
										repeatType: "loop",
										duration: 1.4,
										times: [0, 0.18, 0.36, 0.54, 0.72, 1],
										ease: "easeInOut",
										delay: 0.12, // debounce before each loop
										debounce: 0.5,
									}}>
									<NextImage
										src={FINGERPRINT_ICON}
										alt="fingerprint"
										width={32}
										height={32}
										style={{
											display: "block",
											margin: "0 auto",
										}}
									/>
								</motion.span>
							</span>
						</motion.button>
					) : null}
				</motion.div>
			</div>
			<motion.div
				className="absolute top-0 right-0 z-10 bg-[url('/images/pastel_bg.jpeg')] bg-position-center w-[3rem] h-full pt-[75px] border-l border-black"
				style={{
					backgroundPositionX: "65%",
				}}
				initial={{ opacity: 0, x: 40 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 1.3, duration: 0.7, ease: "easeOut" }}>
				<motion.div
					className="text-black text-2xl font-bold uppercase min-w-[3rem] h-full flex items-center justify-start"
					style={{
						writingMode: "vertical-lr",
						lineHeight: 1,
					}}
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.5, duration: 0.7, ease: "easeOut" }}>
					Boarding pass
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default BoardingPass;
