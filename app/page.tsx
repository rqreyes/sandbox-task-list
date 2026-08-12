"use client";

import {
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  IconButton,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";

export default function Home() {
  // hooks
  // ------------------------------------------------------------
  const theme = useTheme();

  // render
  // ------------------------------------------------------------
  return (
    <Container component="main" maxWidth="sm">
      <Card>
        <CardHeader title="My Task List" sx={{ textAlign: "center" }} />
        <CardContent>
          <Stack direction="row" spacing={1}>
            <Checkbox />
            <TextField sx={{ width: 1 }} variant="standard" />
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Checkbox />
            <TextField sx={{ width: 1 }} variant="standard" />
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Checkbox />
            <TextField sx={{ width: 1 }} variant="standard" />
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Checkbox />
            <TextField sx={{ width: 1 }} variant="standard" />
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "space-between",
            pb: theme.spacing(2),
            px: theme.spacing(2),
          }}
        >
          <Button startIcon={<AddIcon />} type="button" variant="contained">
            Add task
          </Button>
          <Stack direction="row" spacing={1}>
            <Button startIcon={<CloseIcon />} type="button" variant="outlined">
              Cancel
            </Button>
            <Button startIcon={<SaveIcon />} type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
}
