import mock from "./assets/mock.jpg";
function HomePage() {
	return (
		<>
			<div
				id="homepage"
				className="flex flex-col md:flex-row basis-[70vh] justify-center items-center p-6 md:p-10 gap-6 md:gap-0"
			>
				<img
					src={mock}
					alt="mock"
					className="h-60 md:h-70"
				/>
				<p className="text-center p-4 md:p-10">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Maiores ad nam pariatur voluptates. Maiores nam atque placeat
					autem eligendi voluptate, fuga quasi illo, impedit culpa
					repellendus, id harum adipisci tempora?
				</p>
			</div>
		</>
	);
}

export default HomePage;
