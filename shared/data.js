window.SITE={
 "stats": [
  {
   "value": "10,628",
   "count": 10628,
   "label": "Directory objects recovered"
  },
  {
   "value": "~3,500",
   "count": 3500,
   "prefix": "~",
   "label": "Active users supported"
  },
  {
   "value": "400–500",
   "label": "E3 licenses reclaimed"
  },
  {
   "value": "23",
   "count": 23,
   "label": "Projects documented"
  }
 ],
 "expertise": [
  [
   "ServiceNow & service management",
   "Incident, Request, Knowledge, Service Catalog, Flow Designer, approvals, SLAs, and notifications. Business Rules, Client Scripts, UI Policies, Script Includes, ACLs, roles, and groups. CMDB and CSDM data, identification rules, Import Sets, Transform Maps, Scripted REST APIs, Discovery and MID Server."
  ],
  [
   "Microsoft 365 collaboration",
   "Exchange Online and hybrid Exchange, remote mailbox routing, shared mailboxes and delegation, mail flow and SMTP relay. OneDrive Known Folder Move, SharePoint permissions and ownership, Teams, Purview Content Search and eDiscovery, licensing."
  ],
  [
   "Identity & security",
   "Active Directory, Entra ID, Entra Connect and Cloud Sync, SSO and SAML, MFA, Conditional Access, Privileged Identity Management, RBAC and least privilege. Intune, BitLocker escrow, Windows LAPS, CrowdStrike Falcon, Check Point Harmony, and Defender."
  ],
  [
   "Automation & infrastructure",
   "PowerShell 7, Microsoft Graph, REST, GraphQL, and Power Automate, built preview-first with logging and rerun safety. ManageEngine ADManager Plus, Rubrik, Nutanix AHV, Windows Server, Ubuntu, DFS, DNS, DHCP, Group Policy, Zabbix, and Grafana."
  ]
 ],
 "certs": [
  {
   "name": "Certified System Administrator",
   "abbr": "CSA",
   "img": "assets/servicenow-csa.png",
   "url": "https://www.credly.com/badges/29ebd944-6505-4ada-a078-04feebbdc6ec/public_url"
  },
  {
   "name": "Certified Implementation Specialist — Data Foundations",
   "abbr": "CMDB and CSDM",
   "img": "assets/servicenow-data-foundations.png",
   "url": "https://www.credly.com/badges/7add255d-192f-43ce-9f97-c411e505c777/public_url"
  }
 ],
 "experience": [
  {
   "when": "2025–Present",
   "org": "Regulated healthcare network · Multiple affiliates",
   "title": "ServiceNow Administrator & Hybrid Systems Engineer",
   "summary": "Microsoft 365, hybrid identity, and ServiceNow for about 3,500 active users and 15,000 directory objects.",
   "bullets": [
    "Led recovery after a sync scope change soft-deleted about 10,628 Entra ID objects, restoring directory links and shared mailbox access.",
    "Rolled out OneDrive Known Folder Move from an IT pilot to every affiliate through Group Policy.",
    "Reclaimed about 400 to 500 E3 licenses by converting departed users’ mailboxes to shared mailboxes.",
    "Replaced permanent Conditional Access exclusions with time-limited Entra PIM group membership.",
    "Led recovery after a Microsoft EWS enforcement change caused about 57,000 Exchange Online backup failures, restoring backups the same evening.",
    "Built a JEA endpoint running as a gMSA so ADManager Plus provisions hybrid remote mailboxes without the Exchange 2019 server.",
    "Built staged onboarding and offboarding in ADManager Plus across AD, Entra ID, Exchange, OneDrive, and Rubrik.",
    "Integrated Entra ID with ServiceNow for user provisioning and SSO."
   ]
  },
  {
   "when": "2021–2025",
   "org": "Automotive dealership group",
   "title": "ServiceNow Administrator / Systems Implementation",
   "summary": "ServiceNow platform owner and Microsoft systems administrator for dealership operations.",
   "bullets": [
    "Set up the Microsoft tenant and connected Entra ID SSO to ServiceNow ITSM, Salesforce CRM, and vAuto.",
    "Migrated every departmental file share, about 20 TB across five departments, to SharePoint Online with Entra ID group-based access, then decommissioned the on-premises shares.",
    "Designed Service Catalog items, Flow Designer workflows, approvals, SLAs, notifications, and escalations.",
    "Administered Incident, Request, Knowledge, and CMDB, including CMDB cleanup, Import Sets, and Transform Maps.",
    "Built reports and dashboards, managed update sets and upgrades, and ran UAT in Agile sprint cycles."
   ]
  },
  {
   "when": "2017–2021",
   "org": "Enterprise telecommunications",
   "title": "IT Systems Specialist",
   "summary": "Tier 1 and Tier 2 enterprise support across Windows, Active Directory, VPN, and application access.",
   "bullets": [
    "Supported the move from a legacy service platform to ServiceNow through testing, defect reporting, and workflow validation.",
    "Migrated knowledge base content and supported end users through the transition.",
    "Owned high-volume incidents through resolution and escalation."
   ]
  }
 ],
 "projects": [
  {
   "title": "Recovering 10,628 deleted directory objects",
   "category": "Identity & Security",
   "tags": [
    "Entra Connect",
    "Entra ID",
    "Exchange hybrid",
    "PowerShell"
   ],
   "metric": "10,628",
   "metricLabel": "objects recovered",
   "featured": true,
   "summary": "Led recovery after a sync scope change soft-deleted about 10,628 Entra ID objects.",
   "challenge": "A change to Entra Connect OU filtering removed the Disabled Users OU from sync scope. Connect staged deletions for every object in it, and about 10,628 Entra ID objects were soft-deleted. Those disabled accounts anchor converted shared mailboxes, so shared mailbox access was at risk.",
   "approach": "Led the recovery. Added the Disabled Users OU back into the Entra Connect sync scope, restored the soft-deleted cloud objects, and ran a sync cycle to re-link each on-premises account to its Entra ID object. Then checked that authorized delegates could still open the affected shared mailboxes.",
   "outcome": "Directory links and shared mailbox access were restored. Sync scope changes are now treated as change-controlled, with the export deletion threshold enabled at 500 and pending deletes previewed before export."
  },
  {
   "title": "Time-limited Conditional Access exceptions with PIM",
   "category": "Identity & Security",
   "tags": [
    "Entra ID",
    "Conditional Access",
    "PIM for Groups",
    "Graph PowerShell"
   ],
   "metric": "Auto-expiry",
   "metricLabel": "no permanent exceptions",
   "featured": true,
   "summary": "Replaced permanent geo-block exclusions with access that expires on its own.",
   "challenge": "A production Conditional Access policy blocks sign-ins from restricted locations for all users. Travel exceptions were handled by excluding individual users directly, and those exclusions stayed in place until someone remembered to remove them.",
   "approach": "Created a dedicated security group excluded from the geo-block policy and managed its membership through Entra PIM for Groups, so each exception is an active assignment with a fixed end date. Moved an existing direct exclusion into the group while preserving the other exclusions, and wrote a read-only Microsoft Graph PowerShell check that confirms the policy is enabled, the direct exclusion is gone, the group is excluded, and the user is a current member.",
   "outcome": "A reusable process for temporary access that removes itself on schedule, keeps the production policy intact, and can be verified from the command line instead of portal screenshots."
  },
  {
   "title": "OneDrive Known Folder Move, pilot to production",
   "category": "Microsoft 365",
   "tags": [
    "OneDrive",
    "Group Policy",
    "Active Directory"
   ],
   "metric": "All affiliates",
   "metricLabel": "pilot to production",
   "featured": true,
   "summary": "Rolled out automatic Desktop, Documents, and Pictures backup to every affiliate.",
   "challenge": "User files lived on local machines and legacy redirected folders, with no consistent cloud backup across affiliates.",
   "approach": "Built a OneDrive Group Policy and piloted it on the IT and test OUs after a three-day notice period, checking both user and computer policy application. Users confirmed backup status with screenshots, and the pilot showed no sync errors or missed policies. Excluded service accounts through GPO security filtering, then linked a production GPO to user and computer OUs across all affiliates in August 2026 and verified it with gpresult and affiliate sampling.",
   "outcome": "Desktop, Documents, and Pictures back up automatically for about 3,200 users, with Files On-Demand, silent sign-in, and no option for users to turn it off. No tickets were raised from the rollout."
  },
  {
   "title": "Shared mailbox conversion and E3 license recovery",
   "category": "Microsoft 365",
   "tags": [
    "Exchange hybrid",
    "Exchange Online",
    "Microsoft 365 Admin",
    "PowerShell"
   ],
   "metric": "400–500",
   "metricLabel": "E3 licenses reclaimed",
   "featured": true,
   "summary": "Reclaimed about 400 to 500 E3 licenses by converting departed users’ mailboxes to shared mailboxes.",
   "challenge": "Many departed or inactive accounts still held Microsoft 365 E3 licenses, but their mailboxes had to be kept for retention and business access.",
   "approach": "Reviewed accounts inactive for about three months, checked AD status and mailbox type, and converted eligible mailboxes to shared before releasing licenses. Personally ran a batch of 243 conversions in September 2026 and validated recipient state, including RemoteSharedMailbox objects in hybrid Exchange. Audited about 412 never-signed-in accounts across AD, Entra, Exchange, and Microsoft 365 activity before any action was taken.",
   "outcome": "About 400 to 500 E3 licenses reclaimed and 529 mailbox conversions across the program, with mailbox data kept for retention."
  },
  {
   "title": "Moving a dealership's file shares to SharePoint",
   "category": "Microsoft 365",
   "tags": [
    "SharePoint Online",
    "SPMT",
    "Entra ID",
    "OneDrive",
    "Teams"
   ],
   "metric": "~20 TB",
   "metricLabel": "5 departments migrated",
   "featured": false,
   "summary": "Moved every departmental share into SharePoint Online and retired the on-premises file server.",
   "challenge": "About 200 staff across Sales, Finance, Management, Motor Vehicle, and Service worked from mapped drives on a single on-premises server. Permissions had been granted user by user for years, folders holding customer licence copies and lender paperwork were broadly open, and there was no version history or audit trail.",
   "approach": "Inventoried every share, its owners, and its permissions, then sized the data at about 20 TB. That exceeded the tenant's included storage, so additional Microsoft 365 file storage was approved before migrating. Designed one SharePoint site per department with restricted libraries for DMV, Finance, and Management content, with all access granted through Entra ID security groups. Department owners signed off on what moved or was archived, then each department migrated in its own wave with the SharePoint Migration Tool, delta passes, after-hours cutovers, and file-count and permission checks with real users. Ran several rounds of training for every department.",
   "outcome": "All departmental data now lives in SharePoint with group-based access, auditing, and version history. Each legacy share was set to read-only, monitored, and then decommissioned, removing the single file server from daily operations."
  },
  {
   "title": "Restoring Exchange Online backups after an EWS change",
   "category": "Microsoft 365",
   "tags": [
    "Rubrik",
    "Exchange Online",
    "PowerShell",
    "Vendor advisories"
   ],
   "metric": "~57,000",
   "metricLabel": "backup failures traced",
   "featured": false,
   "summary": "Traced a weekend spike in mailbox backup failures to a Microsoft EWS enforcement change and restored processing.",
   "challenge": "Over a weekend, about 57,000 Exchange-related Rubrik backup failures appeared, with HTTP 403 and hierarchy-ingest errors, so new mailbox backups were failing.",
   "approach": "Led the response. Used the vendor advisory to rule out a change on the backup side, confirmed Exchange Web Services was disabled at the Exchange Online organization level, and re-enabled it with PowerShell. Monitored propagation through the expected CAS routing errors, kept stakeholders updated at each stage, and applied the same fix proactively to a second tenant.",
   "outcome": "Successful backups resumed the same evening, and existing backup data was confirmed intact."
  },
  {
   "title": "Hybrid mailbox provisioning without Exchange 2019",
   "category": "Automation",
   "tags": [
    "ADManager Plus",
    "PowerShell JEA",
    "gMSA",
    "Exchange Management Tools"
   ],
   "metric": "1 run",
   "metricLabel": "account + remote mailbox",
   "featured": false,
   "summary": "Let onboarding create hybrid remote mailboxes without depending on the Exchange server being retired.",
   "challenge": "New-hire onboarding in ADManager Plus still depended on the Exchange 2019 server. Moving it to the Exchange Management Tools failed because the service account's remote PowerShell session could not reach Active Directory, the Kerberos second-hop problem.",
   "approach": "Built a locked-down PowerShell JEA endpoint that runs as a group managed service account and exposes a single function. The function validates the logon name, OU, and accepted email domain, is safe to rerun, enables the remote mailbox, and adds the cloud routing alias the old template created. Isolated a permissions error with -WhatIf tests and fixed it with Microsoft's supported permission script rather than hand-built ACLs. No stored passwords, Kerberos delegation, or CredSSP.",
   "outcome": "Verified end to end in November 2026 with test users on four email domains, matching the old template's addresses on-premises and in Exchange Online. Moving production onboarding to the new template is the next step, with the previous template kept as rollback."
  },
  {
   "title": "Investigating a OneDrive mass deletion",
   "category": "Microsoft 365",
   "tags": [
    "OneDrive",
    "SharePoint",
    "Windows event logs",
    "NTFS"
   ],
   "metric": "1,964",
   "metricLabel": "files restored",
   "featured": false,
   "summary": "Traced a large deletion back to its source and restored 1,964 files.",
   "challenge": "Thousands of files disappeared from OneDrive, and the team needed to know whether the new Known Folder Move policy was responsible.",
   "approach": "Correlated the local Recycle Bin, OneDrive and SharePoint recycle bins, workstation logs, Group Policy state, and file permissions. Established that the deletions started on the workstation and were synced by OneDrive, not caused by the KFM policy. Tracked 3,168 deleted items through restoration.",
   "outcome": "1,964 files restored at the last checkpoint, and the KFM rollout cleared of involvement."
  },
  {
   "title": "Staged offboarding with mailbox backup",
   "category": "Automation",
   "tags": [
    "ADManager Plus",
    "PowerShell",
    "Microsoft Graph",
    "Rubrik GraphQL"
   ],
   "metric": "3 stages",
   "metricLabel": "timed, data first",
   "featured": false,
   "summary": "Offboarding that preserves data first and removes access in timed stages.",
   "challenge": "Offboarding touched AD, Entra ID, Exchange, OneDrive, home drives, and backup, and the steps were not always done in the right order.",
   "approach": "Built successive ADManager Plus task groups: app access removal, OneDrive archiving, and home folder moves first; then hiding from the address list, blocking Microsoft 365 sign-in, and shared mailbox conversion at 10 minutes; then disabling the AD account, moving it to the Disabled OU, and removing memberships at 30 minutes. Added the shared mailbox conversion step myself. Piloted an on-demand Rubrik mailbox snapshot through its GraphQL API with a least-privilege service account and custom role. A test mailbox backed up in about 16 seconds.",
   "outcome": "A repeatable, ordered offboarding process. The Rubrik snapshot step is a validated pilot that is not yet a production gate."
  },
  {
   "title": "Repeatable onboarding with routing rules",
   "category": "Automation",
   "tags": [
    "ADManager Plus",
    "Active Directory",
    "Exchange hybrid",
    "Entra ID"
   ],
   "metric": "Days → hours",
   "metricLabel": "onboarding time",
   "featured": false,
   "summary": "Standardized account creation across affiliates, from AD through licensing.",
   "challenge": "Each affiliate had its own naming, OU, and email domain rules, so new accounts were built inconsistently and often by hand.",
   "approach": "Built an Official Onboarding template with affiliate-specific UPN, OU, and group rules, remote routing addresses for hybrid Exchange, and group-based E3 licensing. Added rehire matching in a later version, plus a scheduled automation that moves accounts from the New Users OU into the correct affiliate OU by email domain.",
   "outcome": "A consistent sequence of AD, Entra ID, licensing, and Intune, with onboarding time reduced from days to hours."
  },
  {
   "title": "Fixing hybrid mail routing at scale",
   "category": "Microsoft 365",
   "tags": [
    "Exchange hybrid",
    "Exchange Online",
    "PowerShell",
    "Entra Connect"
   ],
   "metric": "343",
   "metricLabel": "mailboxes targeted",
   "featured": false,
   "summary": "Corrected remote routing addresses and sync errors behind failed mail delivery.",
   "challenge": "Mailboxes with missing or wrong remote routing addresses, duplicate SMTP addresses, and invalid UPNs were causing delivery failures and Entra Connect export errors.",
   "approach": "Fixed 41 mailboxes first, then targeted a batch of 302 using Set-RemoteMailbox from CSV, followed by a delta sync and a post-change check. Worked through Entra Connect errors, including duplicate SMTP addresses, UPNs with spaces, and a group DN failure. Set up the management server for retiring on-premises Exchange, which is now in progress.",
   "outcome": "Cleaner hybrid routing and fewer sync errors, with a path toward retiring the on-premises Exchange servers."
  },
  {
   "title": "Reconciling the All Staff distribution list",
   "category": "Microsoft 365",
   "tags": [
    "Exchange Online",
    "PowerShell",
    "CSV reporting"
   ],
   "metric": "0 missing",
   "metricLabel": "408 users audited",
   "featured": false,
   "summary": "Brought an all-staff list in line with the actual active workforce, with zero missing users.",
   "challenge": "The organization-wide distribution group had drifted from the real active staff list, so announcements were missing people.",
   "approach": "Built a preview that sorted users into READY, REVIEW, and SKIP (404, 5, and 4), then ran the apply step to add 407 members and skip 5, with 1 already present. Followed up with a final audit.",
   "outcome": "408 users in the group and zero missing at final audit."
  },
  {
   "title": "Email continuity proposal for leadership",
   "category": "Microsoft 365",
   "tags": [
    "Exchange Online",
    "Check Point",
    "Vendor evaluation"
   ],
   "metric": "Proposal",
   "metricLabel": "pending decision",
   "featured": false,
   "summary": "Wrote a proposal for a standby email inbox after a multi-day Microsoft 365 outage.",
   "challenge": "Microsoft’s November 12–13, 2026 incident blocked Exchange Online access across OWA, Outlook, and mobile. With no standby inbox, site leaders and IT coordinated urgent work by phone and text.",
   "approach": "Wrote an Email Continuity Purchase Proposal for leadership. It checks first whether the existing Check Point agreement can provide a live standby inbox, then gets quotes from Mimecast and Proofpoint, runs a pilot with an outage simulation, and buys only for critical staff once the pilot passes clear send, receive, MFA, and message reconciliation tests.",
   "outcome": "Submitted to leadership in November 2026. The decision is pending."
  },
  {
   "title": "Removable media alerts in Teams",
   "category": "Automation",
   "tags": [
    "CrowdStrike Falcon",
    "Power Automate",
    "Microsoft Teams",
    "JSON"
   ],
   "metric": "Hourly",
   "metricLabel": "CrowdStrike to Teams",
   "featured": false,
   "summary": "Turned CrowdStrike file-transfer events into readable alerts for IT.",
   "challenge": "Large or sensitive file copies to USB drives needed visibility without someone manually reading raw security events.",
   "approach": "Set up CrowdStrike monitoring for removable-disk file writes, with alerts for files over 500 MB, files over 2 GB, and .pst files on an hourly schedule. Built a Power Automate flow that reads the event attachment, parses the JSON, filters for removable-disk events, and posts a formatted message to Teams.",
   "outcome": "Timely, readable alerts that support the move to IT-issued encrypted USB drives."
  },
  {
   "title": "Secure monitoring with Grafana and Zabbix",
   "category": "Infrastructure",
   "tags": [
    "Grafana",
    "Zabbix",
    "Entra SSO",
    "AD Certificate Services"
   ],
   "metric": "SSO + MFA",
   "metricLabel": "on monitoring",
   "featured": false,
   "summary": "Put internal monitoring behind HTTPS and enterprise sign-in.",
   "challenge": "The monitoring dashboards used plain HTTP and local accounts.",
   "approach": "Issued an internal certificate from the enterprise PKI for HTTPS, set up Entra SSO with MFA while keeping an emergency local admin, and confirmed the login redirect. Added domain controllers and Cisco Umbrella virtual appliances to Zabbix monitoring.",
   "outcome": "Monitoring dashboards secured with company sign-in and covering core infrastructure."
  },
  {
   "title": "Connecting identity to ServiceNow",
   "category": "ServiceNow",
   "tags": [
    "ServiceNow",
    "Entra ID",
    "Import Sets",
    "Transform Maps",
    "SSO"
   ],
   "metric": "Entra → SN",
   "metricLabel": "user sync + SSO",
   "featured": false,
   "summary": "Brought Entra ID user data into ServiceNow with SSO.",
   "challenge": "User records in ServiceNow needed to match enterprise identity without manual entry.",
   "approach": "Imported Entra ID users into an Import Set and transformed them into sys_user, with updates applied at login. Configured SSO so platform access follows enterprise authentication. In a dealership group, set up the Microsoft tenant and connected Entra ID SSO to ServiceNow ITSM, Salesforce CRM, and vAuto.",
   "outcome": "Consistent user records and a single sign-in experience across ServiceNow and business applications."
  },
  {
   "title": "ServiceNow catalog, workflow, and SLA design",
   "category": "ServiceNow",
   "tags": [
    "Service Catalog",
    "Flow Designer",
    "SLAs",
    "Notifications",
    "Reports"
   ],
   "metric": "SLA-backed",
   "metricLabel": "catalog fulfillment",
   "featured": false,
   "summary": "Standardized how incidents and service requests are submitted and fulfilled.",
   "challenge": "Requests came in through mixed channels with inconsistent approvals, assignment, and follow-up.",
   "approach": "Designed catalog items with Requested Item triggers, manager approval, sequential catalog tasks, fulfillment group assignment, and requester notifications. Added SLAs, escalations, and reporting dashboards, and moved changes through update sets, UAT, and production deployment in Agile sprints.",
   "outcome": "A predictable intake and fulfillment path with clear ownership and measurable service levels."
  },
  {
   "title": "CMDB data quality and identification rules",
   "category": "ServiceNow",
   "tags": [
    "CMDB",
    "CSDM",
    "IRE",
    "Discovery",
    "MID Server"
   ],
   "metric": "IRE",
   "metricLabel": "duplicate prevention",
   "featured": false,
   "summary": "Kept configuration data clean, related, and free of duplicates.",
   "challenge": "CMDB records were duplicated or missing relationships, which made impact analysis unreliable.",
   "approach": "Ran CMDB cleanup and relationship work, aligned data to CSDM, built CI class identification rules, and tested IRE payloads to prevent duplicates, including application-to-Windows-server relationships. Configured Discovery and a MID Server with credentials and IP affinity to populate the CMDB, troubleshooting host classification along the way.",
   "outcome": "More trustworthy CMDB data for incident, change, and service mapping."
  },
  {
   "title": "Scripted REST between ServiceNow instances",
   "category": "ServiceNow",
   "tags": [
    "Scripted REST APIs",
    "REST Messages",
    "JSON"
   ],
   "metric": "2 instances",
   "metricLabel": "REST round trip",
   "featured": false,
   "summary": "Built and tested an API integration between two ServiceNow instances.",
   "challenge": "Needed a working pattern for ServiceNow to exchange records with other systems through its own APIs.",
   "approach": "Built Scripted REST API resources on one instance and outbound HTTP requests from another, with server-side processing and structured JSON responses, then tested the round trip end to end.",
   "outcome": "A reusable integration pattern for connecting ServiceNow to other platforms."
  },
  {
   "title": "Intune inventory meets Active Directory",
   "category": "Automation",
   "tags": [
    "Intune",
    "Microsoft Graph",
    "PowerShell",
    "Task Scheduler"
   ],
   "metric": "Weekly",
   "metricLabel": "scheduled sync",
   "featured": false,
   "summary": "Matched mobile devices to directory users for usable inventory.",
   "challenge": "Mobile device inventory and directory user attributes were kept in separate systems.",
   "approach": "Queried Intune with certificate-based Microsoft Graph authentication, matched devices to users with freshness and device-type rules, and wrote phone and inventory details back to AD. Added preview and apply modes, a cap of 50 updates per run, and an AD backup before each run, then scheduled it weekly.",
   "outcome": "A safe, scheduled sync that supports device visibility and mobile offboarding."
  },
  {
   "title": "Keeping employee lists in sync",
   "category": "Automation",
   "tags": [
    "ManageEngine",
    "Constant Contact API",
    "PowerShell",
    "OAuth"
   ],
   "metric": "3,255",
   "metricLabel": "contacts imported",
   "featured": false,
   "summary": "Connected a scheduled mailbox report to an automated employee mailing list.",
   "challenge": "Employee mailing list membership needed to follow the current enabled-mailbox population.",
   "approach": "Published the latest ManageEngine report to a fixed CSV path, then built a preview and apply sync to Constant Contact with report-age validation, OAuth token refresh, and handling for unsubscribed contacts. Verified the scheduled run.",
   "outcome": "3,296 source contacts processed, 3,255 imported, and 41 unsubscribed contacts correctly skipped."
  },
  {
   "title": "Scaling shared storage from 2 TB to 8 TB",
   "category": "Infrastructure",
   "tags": [
    "Nutanix",
    "Windows Server",
    "DFS",
    "Robocopy"
   ],
   "metric": "2 → 8 TB",
   "metricLabel": "4× capacity",
   "featured": false,
   "summary": "Expanded staff home drives before they ran out of space.",
   "challenge": "The staff home drive volume was 99.64% full at 2 TB.",
   "approach": "Provisioned 8 TB of Nutanix-backed storage, prepared the Windows volume, copied about 1.749 TB in the initial pass and 49.163 GB in a delta pass, and fixed 15 access-denied items before cutover.",
   "outcome": "Four times the capacity, delivered through a staged initial and delta copy."
  },
  {
   "title": "Testing Entra Cloud Sync",
   "category": "Identity & Security",
   "tags": [
    "Entra Cloud Sync",
    "Entra Connect",
    "Active Directory",
    "dsregcmd"
   ],
   "metric": "13–15 min",
   "metricLabel": "attribute sync time",
   "featured": false,
   "summary": "Piloted Cloud Sync before any wider identity sync migration.",
   "challenge": "Moving off Entra Connect needed real evidence about Cloud Sync behavior and timing.",
   "approach": "Installed the provisioning agent, scoped it to test OUs kept separate from Connect, and measured attribute propagation at about 13 to 15 minutes. Tested enable and disable behavior and account linking, and confirmed a new pilot device was both Entra joined and domain joined.",
   "outcome": "Documented findings and cautions, including the unresolved handoff for existing hybrid devices, to guide the migration decision."
  }
 ]
};
