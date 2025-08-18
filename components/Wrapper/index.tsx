import { motion } from "framer-motion";
import TitleNsub from "./titleNsub";
import CentralIcon from "./centralIcon";
import Signature from "./signature";

interface IProps {
	onClick: () => void;
}

const InvitationWrapper = ({ onClick }: IProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className="grid grid-row-12 gap-8 h-full">
			<TitleNsub />
			<CentralIcon onClick={onClick} />
			<Signature />
		</motion.div>
	);
};

export default InvitationWrapper;
