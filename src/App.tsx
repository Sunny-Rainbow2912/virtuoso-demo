// Timeline components no longer needed - using custom implementation
import { Typography, Box } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'
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

  const TimelineItemComponent = ({ entry }: { entry: any; index: number }) => {
    const disabledConfigs = entry.disabledConfigs == null ? {} : entry.disabledConfigs;
    const enabledConfigs = entry.enabledConfigs == null ? {} : entry.enabledConfigs;
    const hasDisabled = Object.keys(disabledConfigs).length > 0;
    const hasEnabled = Object.keys(enabledConfigs).length > 0;
    
    if (!hasDisabled && !hasEnabled) {
      return null;
    }

    return (
      <Box sx={{ 
        display: 'flex', 
        mb: 3, 
        position: 'relative',
        '&:not(:last-child)::after': {
          content: '""',
          position: 'absolute',
          left: '15px',
          top: '30px',
          bottom: '-24px',
          width: '2px',
          backgroundColor: '#e0e0e0'
        }
      }}>
        {/* Timeline dot */}
        <Box sx={{ 
          position: 'relative',
          zIndex: 1,
          mr: 2,
          mt: 0.5
        }}>
          <Box sx={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: '#11abd1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            color: 'white',
            border: '3px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {entry.modifiedBy.substring(0, 2).toUpperCase()}
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ 
            display: "flex", 
            mb: 1,
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 10,
            py: 1,
            borderBottom: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.1rem", pr: 1 }}>
              {entry.modifiedBy}
            </Typography>
            <Typography sx={{ fontStyle: "italic", fontSize: "1.1rem", color: '#666' }}>
              {dayjs(entry.modifiedAt).format("M/DD/YYYY @ h:mm A")}
            </Typography>
          </Box>
          
          {hasDisabled && (
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "red",
                  fontSize: "1rem",
                  mb: 1
                }}>
                Updated to Ineligible
              </Typography>
              <Box component="ul" sx={{ listStyle: "disc inside", m: 0, p: 0, pl: 1 }}>
                {Object.entries(disabledConfigs).map(([type, configs], i) => {
                  const typeDisplay = tabMap.get(type) || "";
                  return (configs as string[]).map((config: string, configIndex: number) => (
                    <Box
                      key={`${i}-${configIndex}`}
                      component="li"
                      sx={{
                        m: 0,
                        py: 0.25,
                        "&::marker": { color: "#8B96A6" },
                        mb: configIndex === (configs as string[]).length - 1 ? 0 : 0.25,
                      }}>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          fontSize: "0.95rem",
                          color: "#8B96A6",
                        }}>
                        {typeDisplay} - {config}
                      </Typography>
                    </Box>
                  ));
                })}
              </Box>
            </Box>
          )}
          
          {hasEnabled && (
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "green",
                  fontSize: "1rem",
                  mb: 1
                }}>
                Updated to Eligible
              </Typography>
              <Box component="ul" sx={{ listStyle: "disc inside", m: 0, p: 0, pl: 1 }}>
                {Object.entries(enabledConfigs).map(([type, configs], i) => {
                  const typeDisplay = tabMap.get(type) || "";
                  return (configs as string[]).map((config: string, configIndex: number) => (
                    <Box
                      key={`${i}-${configIndex}`}
                      component="li"
                      sx={{
                        m: 0,
                        py: 0.25,
                        "&::marker": { color: "#8B96A6" },
                        mb: configIndex === (configs as string[]).length - 1 ? 0 : 0.25,
                      }}>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          fontSize: "0.95rem",
                          color: "#8B96A6",
                        }}>
                        {typeDisplay} - {formatChangeLogVal(config, typeDisplay)}
                      </Typography>
                    </Box>
                  ));
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const AuditLog = ({ history }: { history: any[] }) => {
    // Filter out entries with no changes
    const validEntries = history.filter(entry => {
      const hasDisabled = entry.disabledConfigs && Object.keys(entry.disabledConfigs).length > 0;
      const hasEnabled = entry.enabledConfigs && Object.keys(entry.enabledConfigs).length > 0;
      return hasDisabled || hasEnabled;
    });

    return (
      <Box sx={{ 
        height: '600px', 
        width: '800px',
        border: '1px solid #e0e0e0', 
        borderRadius: 1, 
        overflow: 'hidden',
        mx: 'auto',
        p: 2
      }}>
        <Virtuoso
          data={validEntries}
          itemContent={(index, entry) => (
            <TimelineItemComponent entry={entry} index={index} />
          )}
          style={{ height: '100%', width: '100%' }}
        />
      </Box>
    );
  };
  return (
    <>
      
      < AuditLog history={history} />
    </>
  )
}

export default App
