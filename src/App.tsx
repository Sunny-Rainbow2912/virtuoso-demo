import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, timelineItemClasses } from '@mui/lab'
import { Typography, Box } from '@mui/material'
import dayjs from 'dayjs'
import './App.css'

function App() {
  // Mock data for demonstration
  const history = [
    {
      modifiedBy: "Sarah Johnson",
      modifiedAt: "2024-01-20T14:22:00Z",
      disabledConfigs: { 
        "security": ["Two-Factor Authentication", "Password Complexity", "Session Timeout", "IP Whitelisting", "Login Attempts Limit", "Account Lockout"],
        "permissions": ["Admin Access", "User Management", "Role Assignment", "Permission Override", "System Configuration"]
      },
      enabledConfigs: { 
        "notifications": ["Email Alerts", "SMS Notifications", "Push Notifications", "Slack Integration", "Webhook Notifications", "Dashboard Alerts"]
      }
    },
    {
      modifiedBy: "Mike Chen",
      modifiedAt: "2024-01-19T09:15:00Z",
      disabledConfigs: null,
      enabledConfigs: { 
        "features": ["Advanced Analytics", "Custom Reports", "Data Export", "API Access", "Real-time Dashboard", "Custom Widgets", "Data Visualization", "Trend Analysis"],
        "billing": ["Auto-renewal", "Payment Processing", "Invoice Generation", "Subscription Management", "Usage Tracking", "Billing Alerts"]
      }
    },
    {
      modifiedBy: "Emily Rodriguez",
      modifiedAt: "2024-01-18T16:45:00Z",
      disabledConfigs: { 
        "billing": ["Auto-renewal", "Payment Processing", "Invoice Generation", "Subscription Management", "Usage Tracking", "Billing Alerts", "Payment Methods", "Tax Calculation"]
      },
      enabledConfigs: { 
        "notifications": ["Priority Support", "24/7 Chat", "Email Support", "Phone Support", "Ticket System", "Live Chat", "Support Documentation", "Knowledge Base"]
      }
    },
    {
      modifiedBy: "David Kim",
      modifiedAt: "2024-01-17T11:30:00Z",
      disabledConfigs: { 
        "security": ["Data Encryption", "Access Logging", "Audit Trail", "Security Scanning", "Vulnerability Assessment", "Compliance Monitoring", "Data Masking", "Secure Backup"],
        "permissions": ["Admin Access", "User Management", "Role Assignment", "Permission Override", "System Configuration", "Data Access Control", "API Permissions", "Feature Toggles"]
      },
      enabledConfigs: null
    },
    {
      modifiedBy: "Lisa Wang",
      modifiedAt: "2024-01-16T08:20:00Z",
      disabledConfigs: { 
        "features": ["Advanced Analytics", "Custom Reports", "Data Export", "API Access", "Real-time Dashboard", "Custom Widgets", "Data Visualization", "Trend Analysis", "Machine Learning", "Predictive Analytics"]
      },
      enabledConfigs: { 
        "notifications": ["Real-time Alerts", "Performance Metrics", "System Health", "Error Monitoring", "Uptime Tracking", "Performance Reports", "Alert Escalation", "Notification Preferences"],
        "security": ["Encryption", "Access Logs", "Security Monitoring", "Threat Detection", "Incident Response", "Security Policies", "Compliance Reporting", "Risk Assessment"]
      }
    }
  ];

  const tabMap = new Map([
    ["security", "Security Settings"],
    ["permissions", "User Permissions"],
    ["notifications", "Notification Settings"],
    ["features", "Feature Flags"],
    ["billing", "Billing Configuration"]
  ]);

  const formatChangeLogVal = (config: string, typeDisplay: string) => {
    return `${typeDisplay} - ${config}`;
  };

  const AuditLog = ({ history }: { history: any[] }) => {
        return (
            <Timeline
                position={"right"}
                sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                    p: 0,
                }}>
                {history.map((entry, i) => {
                    const disabledConfigs = entry.disabledConfigs == null ? new Map() : entry.disabledConfigs;
                    const enabledConfigs = entry.enabledConfigs == null ? new Map() : entry.enabledConfigs;
                    const hasDisabled = Object.keys(disabledConfigs).length > 0;
                    const hasEnabled = Object.keys(enabledConfigs).length > 0;
                    if (!hasDisabled && !hasEnabled) {
                        return undefined;
                    }
    
                    return (
                        <TimelineItem
                            data-testid={`history-entry-${i}`}
                            key={i}>
                            <TimelineSeparator>
                                <TimelineDot
                                    sx={{
                                        backgroundColor: "#11abd1",
                                        height: { xs: 8, xl: 10 },
                                        width: { xs: 8, xl: 10 },
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: { xs: "1rem", xl: "1.25rem" },
                                    }}>
                                    {entry.modifiedBy.substring(0, 2).toUpperCase()}
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ p: 0, pt: 0.5, pl: 1 }}>
                                <Box sx={{ pt: 1.25, display: "flex" }}>
                                    <Typography
                                        sx={{ fontWeight: "bold", fontSize: { xs: "1.05rem", xl: "1.25rem" }, pr: 0.5 }}>
                                        {entry.modifiedBy}
                                    </Typography>
                                    <Typography sx={{ fontStyle: "italic", fontSize: { xs: "1.05rem", xl: "1.25rem" } }}>
                                        {dayjs(entry.modifiedAt).format("M/DD/YYYY @ h:mm A")}
                                    </Typography>
                                </Box>
                                <Box
                                    component={"ul"}
                                    sx={{ listStyle: "disc inside", m: 0, p: 0 }}>
                                    {hasDisabled && (
                                        <>
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                    color: "red",
                                                    fontSize: { xs: "1.05rem", xl: "1.25rem" },
                                                }}>
                                                Updated to Ineligible
                                            </Typography>
                                            {Object.entries(disabledConfigs).map(([type, configs], i) => {
                                                const typeDisplay = tabMap.get(type) || "";
    return (configs as string[]).map((config: string, configIndex: number) => (
      <Box
          key={`${i}-${configIndex}`}
                                                        component="li"
                                                        sx={{
                                                            m: 0,
                                                            py: 0,
                                                            "&::marker": { color: "#8B96A6" },
                                                            mb: i === (configs as string[]).length - 1 ? 0 : 0.25,
                                                        }}>
                                                        <Typography
                                                            variant={"body2"}
                                                            component={"span"}
                                                            sx={{
                                                                fontSize: { xs: "1.05rem", xl: "1.25rem" },
                                                                color: "#8B96A6",
                                                            }}>
                                                            {typeDisplay} - {config}
                                                        </Typography>
                                                    </Box>
                                                ));
                                            })}
                                        </>
                                    )}
                                </Box>
                                <Box
                                    component={"ul"}
                                    sx={{ listStyle: "disc inside", m: 0, p: 0 }}>
                                    {hasEnabled && (
                                        <>
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                    color: "green",
                                                    fontSize: { xs: "1.05rem", xl: "1.25rem" },
                                                }}>
                                                Updated to Eligible
                                            </Typography>
                        {Object.entries(enabledConfigs).map(([type, configs], i) => {
                            const typeDisplay = tabMap.get(type) || "";
                            return (configs as string[]).map((config: string, configIndex: number) => (
                                <Box
                                    key={`${i}-${configIndex}`}
                                                        component="li"
                                                        sx={{
                                                            m: 0,
                                                            py: 0,
                                                            "&::marker": { color: "#8B96A6" },
                                                            mb: configIndex === (configs as string[]).length - 1 ? 0 : 0.25,
                                                        }}>
                                                        <Typography
                                                            variant={"body2"}
                                                            component={"span"}
                                                            sx={{
                                                                fontSize: { xs: "1.05rem", xl: "1.25rem" },
                                                                color: "#8B96A6",
                                                            }}>
                                                            {typeDisplay} - {formatChangeLogVal(config, typeDisplay)}
                                                        </Typography>
                                                    </Box>
                                                ));
                                            })}
                                        </>
                                    )}
                                </Box>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })}
            </Timeline>
        );
    };
  return (
    <>
      
      < AuditLog history={history} />
    </>
  )
}

export default App
