import {
  AddReactionSharp,
  FactCheck,
  Language,
  MusicNote,
  OilBarrel,
  OpacityOutlined,
  Pets,
  School,
  SkipNextOutlined,
  TimeToLeave,
} from "@mui/icons-material";
import { Box } from "@mui/material";

function About({ user, children }) {
  const info = user?.information;

  return (
    <Box>
      <h4 className="text-3xl font-semibolds mt-8 ">About {user?.fullName}</h4>
      {children}

      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-sm font-normal mt-10">
        {info?.schoolName && (
          <Box className="flex items-start gap-4">
            <School />
            <p>
              School Name:
              {info.schoolName}
            </p>
          </Box>
        )}
        {info?.languagesSpoken?.length > 0 && (
          <Box className="flex items-start gap-4">
            <Language />
            <p>
              Languages Spoken:
              {info.languagesSpoken}
            </p>
          </Box>
        )}
        {info?.address && (
          <Box className="flex items-start gap-4">
            <AddReactionSharp />
            <p>
              Address:
              {info.address}
            </p>
          </Box>
        )}
        {info?.favoriteSongTitle && (
          <Box className="flex items-start gap-4">
            <MusicNote />
            <p>
              Favorite Song:
              {info.favoriteSongTitle}
            </p>
          </Box>
        )}
        {info?.funFact && (
          <Box className="flex items-start gap-4">
            <FactCheck />
            <p>
              Fun Fact:
              {info.funFact}
            </p>
          </Box>
        )}
        {info?.timestamp && (
          <Box className="flex items-start gap-4">
            <TimeToLeave />
            <p>
              Timestamp:
              {info.timestamp}
            </p>
          </Box>
        )}
        {info?.uselessSkill && (
          <Box className="flex items-start gap-4">
            <SkipNextOutlined />
            <p>
              Useless Skill:
              {info.uselessSkill}
            </p>
          </Box>
        )}
        {info?.occupation && (
          <Box className="flex items-start gap-4">
            <OpacityOutlined />
            <p>
              Occupation:
              {info.occupation}
            </p>
          </Box>
        )}
        {info?.pets && (
          <Box className="flex items-start gap-4">
            <Pets />
            <p>
              Pets:
              {info.pets}
            </p>
          </Box>
        )}
        {info?.obsessedWith && (
          <Box className="flex items-start gap-4">
            <OilBarrel />
            <p>
              Obsessed With:
              {info.obsessedWith}
            </p>
          </Box>
        )}
      </Box>
      <p className="mt-12">{user?.about}</p>
    </Box>
  );
}

export default About;
