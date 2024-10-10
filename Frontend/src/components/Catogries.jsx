import {
  AccessibilityNewSharp,
  AcUnit,
  BeachAccess,
  BeachAccessOutlined,
  Bed,
  Cabin,
  CabinOutlined,
  DirectionsBus,
  DownhillSkiing,
  Gite,
  HistoryEdu,
  Home,
  House,
  HvacOutlined,
  IceSkating,
  Landscape,
  Park,
  Pool,
  Sailing,
  SettingsInputAntenna,
  Snowboarding,
  StayPrimaryLandscapeOutlined,
  Terrain,
  ViewModule,
  Villa,
  Water,
  Whatshot,
} from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../hooks/mainReducer";

const categories = [
  { title: "Icons", icon: <StayPrimaryLandscapeOutlined /> },
  { title: "National parks", icon: <Park /> },
  { title: "Amazing views", icon: <ViewModule /> },
  { title: "Amazing pools", icon: <Pool /> },
  { title: "Tiny homes", icon: <Home /> },
  { title: "Rooms", icon: <Bed /> },
  { title: "Trending", icon: <Whatshot /> },
  { title: "Islands", icon: <IceSkating /> },
  { title: "Beachfront", icon: <BeachAccess /> },
  { title: "Lakefront", icon: <Landscape /> },
  { title: "Cabins", icon: <Cabin /> },
  { title: "Arctic", icon: <AcUnit /> },
  { title: "A-frames", icon: <CabinOutlined /> },
  { title: "Historical homes", icon: <HistoryEdu /> },
  { title: "Campers", icon: <DirectionsBus /> },
  { title: "Skiing", icon: <DownhillSkiing /> },
  { title: "Ryokans", icon: <House /> },
  { title: "Shepherd's huts", icon: <HvacOutlined /> },
  { title: "Minsus", icon: <Gite /> },
  { title: "Yurts", icon: <Gite /> },
  { title: "Off-the-grid", icon: <SettingsInputAntenna /> },
  { title: "Houseboats", icon: <Sailing /> },
  { title: "Adapted", icon: <AccessibilityNewSharp /> },
  { title: "Ski-in/out", icon: <Snowboarding /> },
  { title: "Beach", icon: <BeachAccessOutlined /> },
  { title: "Lake", icon: <Water /> },
  { title: "Countryside", icon: <Home /> },
  { title: "Mountains", icon: <Terrain /> },
  { title: "Villas", icon: <Villa /> },
];

function Catogries() {
  const query = useSelector((state) => state.main.query);
  const dispatch = useDispatch();
  return (
    <Box className=" mt-1 border-b pt-4 pb-2 border-[#e1e0e0]">
      <Container className="w-full overflow-auto scrollbar-hide ">
        <Box className=" flex  w-full gap-8 px-4 ">
          {categories.map((item, i) => (
            <Box
              key={i}
              className={`hover:border-b ${
                query == item.title ? "text-black border-b" : "text-secondary"
              }  hover:text-black border-gray-300 transition-all pb-2 cursor-pointer`}
              onClick={() => {
                dispatch(setQuery(item.title));
              }}
            >
              <div className="font-sans   min-w[100px] text-center">
                {item.icon}

                <p className="w-full text-center text-[11px] font-semibold text-nowrap">
                  {item.title}
                </p>
              </div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Catogries;
