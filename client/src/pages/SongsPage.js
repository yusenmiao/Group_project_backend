import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Slider,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import SongCard from "../components/SongCard";
import { formatDuration } from "../helpers/formatter";
const config = require("../config.json");

export default function SongsPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);

  const [name, setName] = useState("");
  const [Temperature, setTemperature] = useState([-10, 40]);
  const [plays, setPlays] = useState([0, 1100000000]);
  const [danceability, setDanceability] = useState([0, 1]);
  const [energy, setEnergy] = useState([0, 1]);
  const [valence, setValence] = useState([0, 1]);
  const [Alaska, setAlaska] = useState(false);
  const [Intermountain, setIntermountain] = useState(false);
  const [Midwest, setMidwest] = useState(false);
  const [National_Capital, setNational_Capital] = useState(false);
  const [Northeast, setNortheast] = useState(false);
  const [Pacific_West, setPacific_West] = useState(false);
  const [Southeast, setSoutheast] = useState(false);
  const [Spring, setSpring] = useState(false);
  const [Summer, setSummer] = useState(false);
  const [Fall, setFall] = useState(false);
  const [Winter, setWinter] = useState(false);

  const [Camp, setCamp] = useState(false);
  const [Tent, setTent] = useState(false);
  const [RV, setRV] = useState(false);


  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/search_parks`)
      .then((res) => res.json())
      .then((resJson) => {
        const songsWithId = resJson.map((song) => ({
          id: song.pid,
          ...song,
        }));
        setData(songsWithId);
      });
  }, []);

  const search = () => {
    fetch(
      `http://${config.server_host}:${config.server_port}/search_parks?name=${name}` +
        `&Temperature_low=${Temperature[0]}` + `&Temperature_high=${Temperature[1]}` + 
        `&Alaska=${Alaska}` + `&Intermountain=${Intermountain}` +`&Midwest=${Midwest}` +
        `&National_Capital=${National_Capital}` + `&Northeast=${Northeast}` + 
        `&Pacific_West=${Pacific_West}` +  `&Southeast=${Southeast}` +
        `&Spring=${Spring}` + `&Summer=${Summer}` + 
        `&Fall=${Fall}` +  `&Winter=${Winter}`+ `&Camp=${Camp}` + 
        `&Tent=${Tent}` + `&RV=${RV}` 
      // `&plays_low=${plays[0]}&plays_high=${plays[1]}` +
      // `&danceability_low=${danceability[0]}&danceability_high=${danceability[1]}` +
      // `&energy_low=${energy[0]}&energy_high=${energy[1]}` +
      // `&valence_low=${valence[0]}&valence_high=${valence[1]}` +
      // `&explicit=${explicit}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        // DataGrid expects an array of objects with a unique id.
        // To accomplish this, we use a map with spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
        const songsWithId = resJson.map((song) => ({
          id: song.pid,
          ...song,
        }));
        setData(songsWithId);
      });
  };

  // This defines the columns of the table of songs used by the DataGrid component.
  // The format of the columns array and the DataGrid component itself is very similar to our
  // LazyTable component. The big difference is we provide all data to the DataGrid component
  // instead of loading only the data we need (which is necessary in order to be able to sort by column)
  const columns = [
    // {
    //   field: "full_name",
    //   headerName: "Park Name",
    //   width: 300,
    //   renderCell: (params) => (
    //     <Link onClick={() => setSelectedSongId(params.row.pid)}>
    //       {params.full_name}
    //     </Link>
    //   ),
    // },
    { field: "full_name", headerName: "Park Name", width: 450 },
    { field: "region", headerName: "Region", width: 150 },
    { field: "visitor_count", headerName: "Visitor Count", width: 150 },
    { field: "animal_count", headerName: "Animal Count", width: 150 },
    { field: "avg_temper", headerName: "Avg Temper", width: 150 },
    // { field: "valence", headerName: "Valence" },
    // { field: "tempo", headerName: "Tempo" },
    // { field: "key_mode", headerName: "Key" },
    // { field: "explicit", headerName: "Explicit" },
  ];

  // This component makes uses of the Grid component from MUI (https://mui.com/material-ui/react-grid/).
  // The Grid component is super simple way to create a page layout. Simply make a <Grid container> tag
  // (optionally has spacing prop that specifies the distance between grid items). Then, enclose whatever
  // component you want in a <Grid item xs={}> tag where xs is a number between 1 and 12. Each row of the
  // grid is 12 units wide and the xs attribute specifies how many units the grid item is. So if you want
  // two grid items of the same size on the same row, define two grid items with xs={6}. The Grid container
  // will automatically lay out all the grid items into rows based on their xs values.
  return (
    <Container>
      {selectedSongId && (
        <SongCard
          songId={selectedSongId}
          handleClose={() => setSelectedSongId(null)}
        />
      )}
      <h2>Search Parks</h2>
      <Grid container spacing={6}>
        <Grid item xs={8}>
          <TextField
            label="Park Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Alaska"
            control={
              <Checkbox
                checked={Alaska}
                onChange={(e) => setAlaska(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Intermountain"
            control={
              <Checkbox
                checked={Intermountain}
                onChange={(e) => setIntermountain(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Midwest"
            control={
              <Checkbox
                checked={Midwest}
                onChange={(e) => setMidwest(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="National Capital"
            control={
              <Checkbox
                checked={National_Capital}
                onChange={(e) => setNational_Capital(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Northeast"
            control={
              <Checkbox
                checked={Northeast}
                onChange={(e) => setNortheast(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}> 
          <FormControlLabel
            label="Pacific West"
            control={
              <Checkbox
                checked={Pacific_West}
                onChange={(e) => setPacific_West(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Southeast"
            control={
              <Checkbox
                checked={Southeast}
                onChange={(e) => setSoutheast(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Spring"
            control={
              <Checkbox
                checked={Spring}
                onChange={(e) => setSpring(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Summer"
            control={
              <Checkbox
                checked={Summer}
                onChange={(e) => setSummer(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Fall"
            control={
              <Checkbox
                checked={Fall}
                onChange={(e) => setFall(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Winter"
            control={
              <Checkbox
                checked={Winter}
                onChange={(e) => setWinter(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="Camping"
            control={
              <Checkbox
                checked={Camp}
                onChange={(e) => setCamp(e.target.checked)}
              />
            }
          />
        </Grid>
        
        <Grid item xs={4}>
          <FormControlLabel
            label="Tent"
            control={
              <Checkbox
                checked={Tent}
                onChange={(e) => setTent(e.target.checked)}
              />
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            label="RV"
            control={
              <Checkbox
                checked={RV}
                onChange={(e) => setRV(e.target.checked)}
              />
            }
          />
        </Grid>
        
        <Grid item xs={6}>
          <p>Temperature</p>
          <Slider
            value={Temperature}
            min={-10}
            max={40}
            step={1}
            onChange={(e, newValue) => setTemperature(newValue)}
            valueLabelDisplay="auto"
            // valueLabelFormat={(value) => <div>{formatTemperature(value)}</div>}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <p>Plays (millions)</p>
          <Slider
            value={plays}
            min={0}
            max={1100000000}
            step={10000000}
            onChange={(e, newValue) => setPlays(newValue)}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => <div>{value / 1000000}</div>}
          />
        </Grid> */}
        {/* TODO (TASK 24): add sliders for danceability, energy, and valence (they should be all in the same row of the Grid) */}
        {/* Hint: consider what value xs should be to make them fit on the same row. Set max, min, and a reasonable step. Is valueLabelFormat is necessary? */}
        {/* <Grid item xs={4}>
          <p>Danceability</p>
          <Slider
            value={danceability}
            min={0}
            max={1}
            step={0.1}
            onChange={(e, newValue) => setDanceability(newValue)}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => <div>{value}</div>}
          />
        </Grid>
        <Grid item xs={4}>
          <p>Energy</p>
          <Slider
            value={energy}
            min={0}
            max={1}
            step={0.1}
            onChange={(e, newValue) => setEnergy(newValue)}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => <div>{value}</div>}
          />
        </Grid>
        <Grid item xs={4}>
          <p>Valence</p>
          <Slider
            value={valence}
            min={0}
            max={1}
            step={0.1}
            onChange={(e, newValue) => setValence(newValue)}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => <div>{value}</div>}
          />
        </Grid> */}
      </Grid>
      <Button
        onClick={() => search()}
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        Search
      </Button>
      <h2>Results</h2>
      {/* Notice how similar the DataGrid component is to our LazyTable! What are the differences? */}
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
    </Container>
  );
}
