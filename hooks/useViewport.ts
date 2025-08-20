import { useState, useEffect } from "react";

interface ViewportSize {
	width: number;
	height: number;
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}

const useViewport = (): ViewportSize => {
	const [viewport, setViewport] = useState<ViewportSize>({
		width: 0,
		height: 0,
		isMobile: false,
		isTablet: false,
		isDesktop: false,
	});

	useEffect(() => {
		const updateViewport = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			setViewport({
				width,
				height,
				isMobile: width < 768, // Mobile: < 768px
				isTablet: width >= 768 && width < 1024, // Tablet: 768px - 1023px
				isDesktop: width >= 1024, // Desktop: >= 1024px
			});
		};

		// Set initial viewport
		updateViewport();

		// Add event listener for resize
		window.addEventListener("resize", updateViewport);

		// Cleanup
		return () => window.removeEventListener("resize", updateViewport);
	}, []);

	return viewport;
};

export default useViewport;
