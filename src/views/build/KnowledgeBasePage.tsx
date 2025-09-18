import { useEffect, useState } from "react";
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
  Button
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "./AddKnowledgebase";
import { getUserId } from "utils/auth";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

export default function KnowledgeBaseUI() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>(items[0]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAllLinks, setShowAllLinks] = useState(false);
  const userId = getUserId();

  useEffect(() => {
    const fetchKBs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/enterprise/getEnterpriseKBbyUserId/${userId}`
        );
        console.log("fdfsaa", res);

        if (res.data.success) {
          // Map backend data into UI format
          const formatted = res.data.data.map((kb: any) => ({
            ...kb, // ✅ keep original fields like text, webUrl, scrapedUrls
            name: kb.kbName,
            id: `know...${kb.kbId}`,
            uploadedAt: new Date(kb.createdAt)
              .toISOString()
              .slice(0, 16)
              .replace("T", " "),
            details: [
              // scrapedUrls → URLs
              ...(kb.scrapedUrls
                ? JSON.parse(kb.scrapedUrls).map((url: string) => ({
                    type: "url",
                    value: url,
                    pages: null,
                    synced: kb.updatedAt,
                  }))
                : []),

              // kbFiles → files
              ...(Array.isArray(kb.kbFiles)
                ? kb.kbFiles.map((f: any) => ({
                    type: "file",
                    value: f.fileName,
                    size: `${(f.fileSize / 1024).toFixed(1)} KB`,
                  }))
                : []),
            ],
          }));

          setItems(formatted);
        }
      } catch (err) {
        console.error("Error fetching KBs:", err);
      }
    };

    fetchKBs();
  }, [userId]);

  // 📂 text download handler
  const handleDownloadText = (item: any) => {
    const blob = new Blob([item.text || ""], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.name || "knowledgebase"}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
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
                    bgcolor:
                      selectedItem?.name === item.name ? "action.selected" : "inherit",
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
                        minWidth: "250px",
                        maxWidth: "600px",
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
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="secondary" size="small">
                    <DownloadIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {/* ✅ WebUrl main link */}
              {selectedItem.webUrl && (
                <Paper
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LinkIcon color="warning" />
                    <Typography
                      component="a"
                      href={selectedItem.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontWeight: 500,
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {selectedItem.webUrl}
                    </Typography>
                  </Stack>
                  {selectedItem.scrapedUrls && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setShowAllLinks(!showAllLinks)}
                    >
                      {showAllLinks ? "Hide" : "View All"}
                    </Button>
                  )}
                </Paper>
              )}

              {/* ✅ All Scraped Links */}
              {showAllLinks &&
                selectedItem.scrapedUrls &&
                JSON.parse(selectedItem.scrapedUrls).map((url: string, idx: number) => (
                  <Paper
                    key={idx}
                    sx={{
                      p: 2,
                      mb: 1,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LinkIcon color="disabled" />
                    <Typography
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        ml: 1,
                        fontSize: 14,
                        color: "text.primary",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {url}
                    </Typography>
                  </Paper>
                ))}

              {/* ✅ Download text file */}
              {selectedItem.text && (
                <Paper
                  sx={{
                    p: 2,
                    mt: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <InsertDriveFileIcon color="error" />
                    <Typography fontWeight={500}>Text File</Typography>
                  </Stack>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleDownloadText(selectedItem)}
                  >
                    Download
                  </Button>
                </Paper>
              )}

              {/* ✅ Old details list (files, etc.) */}
              <Stack spacing={2} mt={2}>
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
                        <>
                          <LinkIcon color="warning" />
                          <Box>
                            <Typography
                              fontWeight={500}
                              component="a"
                              href={
                                d.value.startsWith("http")
                                  ? d.value
                                  : `https://${d.value}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                textDecoration: "none",
                                color: "primary.main",
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {d.value}
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        <>
                          <InsertDriveFileIcon color="error" />
                          <Box>
                            <Typography
                              fontWeight={500}
                              sx={{
                                cursor: "pointer",
                                color: "text.primary",
                                "&:hover": { textDecoration: "underline" },
                              }}
                              onClick={() => {
                                window.open(
                                  `${process.env.NEXT_PUBLIC_API_URL}/uploads/${d.value}`,
                                  "_blank"
                                );
                              }}
                            >
                              {d.value}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {d.size}
                            </Typography>
                          </Box>
                        </>
                      )}
                    </Stack>
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
      <BasicModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
