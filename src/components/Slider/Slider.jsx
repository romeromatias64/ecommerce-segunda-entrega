import "./Slider.css";
import React from "react";

export default function Slider() {
	return (
		<>
			<section className="banner-section">
				{/* BANNER SECTION */}
				<div className="slider">
					{/* Sect de inputs para el slider */}
					<input type="radio" name="slider" id="slide-1" />
					<input type="radio" name="slider" id="slide-2" />
					<input type="radio" name="slider" id="slide-3" />
					{/* Sect de botones personalizados para el slider (labels) */}
					<div className="slider-buttons">
						<label htmlFor="slide-1" />
						<label htmlFor="slide-2" />
						<label htmlFor="slide-3" />
					</div>
					{/* Sect de imagenes para el slider */}
					<div className="slider-content">
						<div className="slide slide-1">
							<img
								className="slider-image"
								src="https://i.imgur.com/qqzZ7QL.jpeg"
								alt=""
							/>
							<img
								className="slider-logo"
								src="https://i.imgur.com/2G5FQDj.png"
								alt=""
							/>
						</div>
						<div className="slide slide-2">
							<img
								className="slider-image"
								src="https://i.imgur.com/vfxR4pd.png"
								alt=""
							/>
							<img
								className="slider-logo"
								src="https://i.imgur.com/yAATDO3.png"
								alt=""
							/>
						</div>
						<div className="slide slide-3">
							<img
								className="slider-image"
								src="https://i.imgur.com/BuYknWw.jpeg"
								alt=""
							/>
							<img
								className="slider-logo"
								src="https://i.imgur.com/VrlmmaP.png"
								alt=""
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
