"use client";

import Link from 'next/link';

// material imports
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CallIcon from '@mui/icons-material/Call';

// project imports
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import { APP_DEFAULT_PATH } from 'config';
import GRID_COMMON_SPACING from 'config';

// assets
import { Star1 } from '@wandersonalwes/iconsax-react';
import { useEffect, useRef, useState } from 'react';
import { fetchAgent } from '../../../Services/auth'; // ✅ your API call
import CallDialog from 'components/CallDialog';
import { RetellWebClient } from "retell-client-js-sdk";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';


const breadcrumbLinks = [{ title: 'home', to: APP_DEFAULT_PATH }, { title: 'Demo Agents view' }];

export default function DemoAgentsViewPage() {
  const [agents, setAgents] = useState<any[]>([]); // store API data
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callLoading, setCallLoading] = useState(false);
  const isEndingRef = useRef(false);
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [callId, setCallId] = useState("");
  const [retellWebClient, setRetellWebClient] = useState(null);
      const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: AlertColor;
      }>({
        open: false,
        message: '',
        severity: 'info',
      });
      
      const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
      };
    

// console.log('selectedAgent',selectedAgent)
  useEffect(() => {
    const loadAgents = async () => {
      try {
        const res = await fetchAgent(); // ✅ call your API function
        console.log("API response:", res);

        // Assuming res is an array of agents
        setAgents(res?.agents||[]);
      } catch (err) {
        console.error("Error fetching agents:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  const ItemRow = ({ title, value }: { title: string; value: string }) => (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 5, py: 1 }}>
      <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
  
  const handleOpenDialog = (agent: any) => {
    setSelectedAgent(agent);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      isEndingRef.current = true;
      setCallLoading(true);
      setTimeout(() => {
        isEndingRef.current = false;
        setIsCallActive(false);
        setCallLoading(false);
        setOpenDialog(false);
        setSelectedAgent(null);
      }, 1000); // Simulate call ending delay
    } else {
      setOpenDialog(false);
      setSelectedAgent(null);
    }
  };

    useEffect(() => {
    const client = new RetellWebClient();
    client.on("call_started", () => setIsCallActive(true));
    client.on("call_ended", () => setIsCallActive(false));
    client.on("update", (update) => {
      //  Mark the update clearly as AGENT message
      const customUpdate = {
        ...update,
        source: "agent", // Add explicit source
      };

      // Dispatch custom event for CallTest
      window.dispatchEvent(
        new CustomEvent("retellUpdate", { detail: customUpdate })
      );
    });

    setRetellWebClient(client);
  }, []);

    const handleStartCall = async() => {
      setCallLoading(true);
       
          let micPermission = await navigator.permissions.query({ name: "microphone" as PermissionName });
  
      if (micPermission.state !== "granted") {
        try {
          // Step 2: Ask for mic access
          await navigator.mediaDevices.getUserMedia({ audio: true });
  
          // Step 3: Recheck permission after user action
          micPermission = await navigator.permissions.query({ name: "microphone" as PermissionName });
  
          if (micPermission.state !== "granted") {
            setSnackbar({
            open: true,
            message: 'You must grant microphone access to start the call.',
            severity: 'warning',
          });
        
            return;
          }
        } catch (err) {
          // User denied mic access
          setSnackbar({
          open: true,
          message: 'Please allow microphone permission to continue.',
          severity: 'error',
           });
             setCallLoading(false);
          // setShowCallModal(false);
          return;
        }
      }
        setCallLoading(true);
      try {
        const agentId = selectedAgent?.agent_id;
        if (!agentId) throw new Error("No agent ID found");
  
        // Example: Initiate a call with Retell AI
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/agent/create-web-call`,
          {
            agent_id: agentId,
            // Add other required parameters, e.g., phone number or call settings
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_RETELL_API}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCallLoading(true);
  
        if (response.status == 403) {
          setSnackbar({
        open: true,
        message: 'Agent Plan minutes exhausted',
        severity: 'error',
         });
          setIsCallInProgress(false);
          // setTimeout(() => {
          //   setPopupMessage("");
          // }, 5000);
          return;
        }
  
        await retellWebClient.startCall({ accessToken: response?.data?.access_token });
        setCallId(response?.data?.call_id);
        setIsCallActive(true);
      } catch (error) {
        console.error("Error starting call:", error);

        if (error.status == 403) {
        setSnackbar({
        open: true,
        message: 'Agent Plan minutes exhausted',
        severity: 'error',
         });
          setIsCallInProgress(false);
          // setTimeout(() => {
          //   setPopupMessage("");
          // }, 5000);
          return;
        }
        else{
      setSnackbar({
      open: true,
      message: 'Failed to start call. Please try again.',
      severity: 'error',
     });
        }
    
      } finally {
        setCallLoading(false);
      }
    };
  
    const handleEndCall = async() => {
      isEndingRef.current = true;
      setCallLoading(true);
          isEndingRef.current = false;
      // setRefresh((prev) => !prev);
      try {
        // Example: End the call with Retell AI
        // const callId = localStorage.getItem("currentCallId"); 
        // const callId = localStorage.getItem("currentCallId"); 
        // if (!callId) throw new Error("No call ID found");
  
        const response = await retellWebClient.stopCall();
  
        setIsCallActive(false);
        isEndingRef.current = false;
      } catch (error) {
        console.error("Error ending call:", error);
        setSnackbar({
      open: true,
      message: 'Failed to end call. Please try again.',
      severity: 'error',
       });
      }
      setTimeout(() => {
        isEndingRef.current = false;
        setIsCallActive(false);
        setCallLoading(false);
        setOpenDialog(false);
        setSelectedAgent(null);
      }, 1000); // Simulate call ending delay
    };


  return (
    <>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Breadcrumbs custom heading="view" links={breadcrumbLinks} />
      </Stack>

      {loading ? (
        <Typography>Loading agents...</Typography>
      ) : (
        <Grid container spacing={5}>
          {agents.map((agent: any, index: number) => (
            <Grid key={index} size={{ xs: 12, sm: 10, lg: 4 }}>
              <MainCard content={false} sx={{ p: 1.25 }}>
                <Box sx={{ position: 'relative', width: 1 }}>
                  <CardMedia
                    component="img"
                    height="auto"
                    image={`${agent?.avatar}` || '/images/male-02.png'} 
                    alt="Agent"
                    sx={{ width: 1, display: 'block', borderRadius: 1 }}
                  />
                </Box>

                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 0.5, mt: 2.5, mb: 1.25 }}>
                  <Stack sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: 1 }}
                    >
                      {agent.agentName || "Test"}
                    </Typography>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, color: 'warning.main' }}>
                      <Star1 size="14" />
                      <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {agent.agentRole || "General Receptionist"}
                      </Typography>
                    </Stack>
                  </Stack>
                  <IconButton size="large" color="primary" sx={{ minWidth: 30 }} onClick={() => handleOpenDialog(agent)}>
                    <CallIcon fontSize="small" />
                  </IconButton>
                </Stack>

                <Divider />
                <Stack>
                  <ItemRow title="Assigned Number" value={agent?.voip_numbers || agent?.phone || "-"} />
                  <Divider />

                  <ItemRow title="Business" value={agent?.businessDetails?.name || agent.company || "-"} />
                  <Divider />
                  <ItemRow title="Category" value={agent?.businessDetails?.BusinessType || "-"} />
                  <Divider />
                  <ItemRow title="Mins Left" value={agent?.mins_left || "-"} />
                   <Divider />
                  <ItemRow title="Language" value={agent?.agentLanguage || "-"} />
               
                </Stack>
              </MainCard>
            </Grid>
          ))}
         {selectedAgent &&
        <CallDialog
          open={openDialog}
          onClose={handleCloseDialog}
          agent={selectedAgent}
          isCallActive={isCallActive}
          callLoading={callLoading}
          onStartCall={handleStartCall}
          onEndCall={handleEndCall}
          isEndingRef={isEndingRef}
        />
         }
        </Grid>
      )}
           <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
