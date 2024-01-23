
import GetStarted from "@/components/landingpage/GetStarted";
import { Box } from "@mui/material";

export default function Home() {
  return (
		<Box className="flex w-full flex-col justify-center items-center flex-1">
			<Box className="w-10/12 md:w-8/12">
				<GetStarted />
			</Box>

			{/* <SelectTargetArea /> */}
		</Box>
  );
}
