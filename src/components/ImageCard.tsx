function ImageCard({ src, className }: { src?: string; className?: string }) {
	return <img src={src} className={className} alt="" />;
}

export default ImageCard;
