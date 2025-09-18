import { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Divider,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon  from "@mui/icons-material/Add";
import BasicModal from "./AddKnowledgebase";
const items = [
  {
    name: "Immigrate Management-2025-05-26",
    id: "know...4b7",
    uploadedAt: "2025-05-26 21:15",
    details: [
      { type: "url", value: "www.designersx.us", pages: 2, synced: "2025-06-16 18:33" },
      { type: "file", value: "174607094444-pakoda.jpg", size: "62 KB" },
    ],
  },
  {
    name: "Company Sales Management-2025-05-28",
    id: "know...7xy",
    uploadedAt: "2025-05-28 15:00",
    details: [
      { type: "url", value: "www.salesportal.com", pages: 5, synced: "2025-06-10 14:22" },
    ],
  },
];

export default function KnowledgeBaseUI() {
  const [selectedItem, setSelectedItem] = useState<any>(items[0]);
  const [open, setOpen] = useState(false);

  return (
    <>
    <Grid container spacing={2} sx={{ height: "100%" }}>
      {/* Left Panel - Knowledge Base List */}
      <Grid item xs={12} md={3}>
        <Paper
          sx={{
            p: 2,
            height: "100%",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
       <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
  <Typography variant="subtitle1" fontWeight="bold">
    Knowledge Base
  </Typography>
    <IconButton color="warning" size="large" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
</Box>
          <List sx={{ maxHeight: "80vh", overflowY: "auto" }}>
            {items.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => setSelectedItem(item)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&:hover": { bgcolor: "action.hover" },
                  bgcolor: selectedItem?.name === item.name ? "action.selected" : "inherit",
                }}
              >
                <ListItemIcon>
                  <DescriptionIcon sx={{ color: "#525866" }} fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: {
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Right Panel - Details */}
      <Grid item xs={12} md={9}>
        {selectedItem ? (
          <Paper
            sx={{
              p: 3,
              minHeight: "80vh",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            {/* Header */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box>
                <Typography variant="h6">{selectedItem.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {selectedItem.id} • Uploaded at: {selectedItem.uploadedAt}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <IconButton color="primary" size="small">
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" size="small">
                  <DownloadIcon />
                </IconButton>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Details List */}
            <Stack spacing={2}>
              {selectedItem.details.map((d: any, i: number) => (
                <Paper
                  key={i}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    {d.type === "url" ? (
                      <LinkIcon color="warning" />
                    ) : (
                      <InsertDriveFileIcon color="error" />
                    )}
                    <Box>
                      <Typography fontWeight={500}>{d.value}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {d.type === "url"
                          ? `${d.pages} Pages • Last synced on ${d.synced}`
                          : d.size}
                      </Typography>
                    </Box>
                  </Stack>
                  <IconButton>
                    <DownloadIcon />
                  </IconButton>
                </Paper>
              ))}
            </Stack>
          </Paper>
        ) : (
          <Paper
            sx={{
              p: 3,
              minHeight: "80vh",
              borderRadius: 2,
              boxShadow: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="text.secondary">
              Select a Knowledge Base to view details
            </Typography>
          </Paper>
        )}
      </Grid>
    </Grid>
    <BasicModal 
        open={open} 
        onClose={() => setOpen(false)} 
        // onSubmit={handleSubmit} 
      />
      </>
  );
}
