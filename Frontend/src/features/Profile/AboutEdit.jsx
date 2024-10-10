import React, { useState } from "react";
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
import { Box, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserInfo } from "../../services/apiUser";
import toast from "react-hot-toast";

function AboutEdit({ user, onMode }) {
  const info = user?.information;

  const [schoolName, setSchoolName] = useState(info?.schoolName || "");
  const [languagesSpoken, setLanguagesSpoken] = useState(
    info?.languagesSpoken || ""
  );
  const [address, setAddress] = useState(info?.address || "");
  const [favoriteSongTitle, setFavoriteSongTitle] = useState(
    info?.favoriteSongTitle || ""
  );
  const [funFact, setFunFact] = useState(info?.funFact || "");
  const [timestamp, setTimestamp] = useState(info?.timestamp || "");
  const [uselessSkill, setUselessSkill] = useState(info?.uselessSkill || "");
  const [occupation, setOccupation] = useState(info?.occupation || "");
  const [pets, setPets] = useState(info?.pets || "");
  const [obsessedWith, setObsessedWith] = useState(info?.obsessedWith || "");
  const [about, setAbout] = useState(user?.about || "");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: UpdateUserInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");
      toast.success(data.message);
      onMode(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit() {
    mutate({
      information: {
        funFact: funFact,
        timestamp: timestamp,
        schoolName: schoolName,
        languagesSpoken: languagesSpoken,
        address: address,
        favoriteSongTitle: favoriteSongTitle,
        uselessSkill: uselessSkill,
        occupation: occupation,
        pets: pets,
        obsessedWith: obsessedWith,
      },
      about: about,
    });
  }

  return (
    <Box>
      <h4 className="text-3xl font-semibolds mt-8">About {user?.fullName}</h4>
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-sm font-normal mt-10">
        <Box className="flex items-start gap-4">
          <School />
          <TextField
            label="School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box className="flex items-start gap-4">
          <Language />
          <TextField
            label="Languages Spoken"
            value={languagesSpoken}
            onChange={(e) => setLanguagesSpoken(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>

        <Box className="flex items-start gap-4">
          <AddReactionSharp />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>

        <Box className="flex items-start gap-4">
          <MusicNote />
          <TextField
            label="Favorite Song"
            value={favoriteSongTitle}
            onChange={(e) => setFavoriteSongTitle(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box className="flex items-start gap-4">
          <FactCheck />
          <TextField
            label="Fun Fact"
            value={funFact}
            onChange={(e) => setFunFact(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box className="flex items-start gap-4">
          <TimeToLeave />
          <TextField
            label="Timestamp"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box className="flex items-start gap-4">
          <SkipNextOutlined />
          <TextField
            label="Useless Skill"
            value={uselessSkill}
            onChange={(e) => setUselessSkill(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box className="flex items-start gap-4">
          <OpacityOutlined />
          <TextField
            label="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box className="flex items-start gap-4">
          <Pets />
          <TextField
            label="Pets"
            value={pets}
            onChange={(e) => setPets(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box className="flex items-start gap-4">
          <OilBarrel />
          <TextField
            label="Obsessed With"
            value={obsessedWith}
            onChange={(e) => setObsessedWith(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
      </Box>
      <Box className="mt-12">
        <TextField
          label="About"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          fullWidth
          variant="outlined"
          multiline
          rows={4}
        />
        <button className="button w-fit mt-10" onClick={handleSubmit}>
          Submit
        </button>
      </Box>
    </Box>
  );
}

export default AboutEdit;
