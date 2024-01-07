
import GetStarted from "@/components/landingpage/GetStarted";
import SelectTargetArea from "@/components/landingpage/SelectTargetArea";
import { Box } from "@mui/material";

export default function Home() {
  return (
		<Box className="flex  flex-col">		
      <GetStarted />
      <SelectTargetArea />
		</Box>
  );
}
