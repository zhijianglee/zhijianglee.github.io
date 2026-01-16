---
title: Ditch ONU and Replace with XPON SFP Stick
description: 
published: true
date: 2026-01-16T15:22:56.558Z
tags: gpon sfp stick, ditch onu, sfp+, gpon, onu
editor: markdown
dateCreated: 2026-01-12T13:39:42.226Z
---

I got this idea from one of a Malaysian forum member with the topic [here .](https://forum.lowyat.net/topic/4925452) 

I believe that he was the one that figured this out and started this trend. He even had a Github wiki [here](https://github.com/Anime4000/RTL960x) that provide some helpful information to get started. 

The following will be a documentation on how I managed to setup on Time dot Com using ODI DFP-34X-2C2 with Mikrotik RB5009. These steps are combination from variety of online resources. Although I had successful attempt implementing it on Unifi during 2020, this guide will be focus on how I got both Internet and VOIP working on Time dot Com. Before I begin, I want to be upfront that this was not endorsed by any ISP nor is official guide by ISP. 

> GPON is a shared network. Any incorrect steps might break the network and cause inconveniences to your neighbor and will trigger alarm at OLT side. They might/block the SN you used. If you used your existing ONU serial, then if they blocked that SN, you will not be able to authenticate again even though you switched back the ONU. There might be site visit charges, and you will be forced to use only the default devices moving forward (even own router also not allowed). I mean really force and ask you to take down your Home Lab Set Up by resetting every username and password and will not provide it to you. ISPs here in Malaysia is not a home lab and DIY friendly even though you did not break anything. They just doesn't like you did not use the default way. Some escalations are needed to get everything back in order

I trust that this is the most transparent guide out there. That Malaysian topic starter forum member no longer provide goodwill support to troubleshoot technical related issues on custom / self bought GPON stick because according to him ONU stick is technically illegal in Malaysia and he received instructions from ISP (Unifi aka Telekom Malaysia is one of them) not to provide anymore support that will promote the increase of custom PON stick. 

## Pre-Requisites

1.  Obtain your PPOE password from selfcare portal because this will be your POLAM password
2.  Obtain device information from your existing Huawei ONT / ONU. (Login via telecomadmin. The default password is TIME(4 digit last MAC) without (). You asked this on lowyat forum, you will get reported

## Configuring the stick

1.  Configure the SFP interface address as 192.168.1.3/24. Ensure do DSTNAT to SFP interface.
2.  Plug in the SFP stick and the optic fiber cable
3.  Login to web interface 192.168.1.1 (U: admin P:admin)
4.  Navigate to settings and fill in the below information
    1.  PLOAM Password (Your PPOE password) (Format: choose ASCI. If there's only HEX option you need to convert)
    2.  GPON SN (Enter the serial number of your ONU. The one begin with HWTC)
    3.  For the rest of the input, you can copy and paste directly form your existing Huawei ONU.
    4.  **If you are not able to comprehend or follow any of the steps until now, stop working on it. Switch back to your existing Huawei ONU.** 
5.  After save the changes. Go to PON and check the status. Make sure if you can receive O5.

You can also ssh into the stick and issue the below command

`flash set OMCI_OLT_MODE 1`  
`flash set  OMCC_VER 128`

**If after checking that all are entered correctly and still not able to get O5. Stop trying. Switch back to your Huawei ONU to ensure everything still works fine.** 

Now, it is assumed that you get an O5 status. Go to VLAN page and check if you able to receive VLAN tagging information something like this

|     |
| --- |
| FilterTbl\[0\]: PRI 0,CFI 0, VID 140 |
| FilterTbl\[0\]: PRI 0,CFI 0, VID 499 |
| FilterTbl\[0\]: PRI 0,CFI 0, VID 599 |
| FilterTbl\[0\]: PRI 0,CFI 0, VID 121 |
| FilterTbl\[0\]: PRI 0,CFI 0, VID 499 |
| FilterTbl\[2\]: PRI 0,CFI 0, VID 599 |

If no, check from the ssh session by issuing `omcicli mib get 84 .`

```plaintext
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VlanTagFilterData
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
=================================
EntityID: 0x01
FilterTbl[0]: PRI 0,CFI 0, VID 140
FwdOp:  0x02
NumOfEntries: 1
=================================
=================================
EntityID: 0x02
FilterTbl[0]: PRI 0,CFI 0, VID 499
FwdOp:  0x04
NumOfEntries: 1
=================================
=================================
EntityID: 0x03
FilterTbl[0]: PRI 0,CFI 0, VID 599
FwdOp:  0x04
NumOfEntries: 1
=================================
=================================
EntityID: 0x04
FilterTbl[0]: PRI 0,CFI 0, VID 121
FwdOp:  0x04
NumOfEntries: 1
=================================
=================================
EntityID: 0x05
FilterTbl[0]: PRI 0,CFI 0, VID 499
FilterTbl[2]: PRI 0,CFI 0, VID 599
FwdOp:  0x04
NumOfEntries: 2
=================================
```

Check if you receive table like above. If YES, you are good to go

## Router Configuration

1.  Torch the SFP interface. Check if you are able to see 8864 (PPOE) Under VLAN499. If YES, you are good to go. Otherwise, you will need to do trial and error trying to pass the VLAN tagging  by using `omcicli mib set 84 0x01 FwdOp 0x02 `
2.  The above is just an example. You may refer [here](https://wiki-archive.opencord.org/attachments/1966449/2557137.pdf) for more details. From the example 0x01 refers to EntityID you retrieved from get 0x02 refers to forward operation.
3.  If unable to see VLAN details, you can try different OMCC*VER by using flash set OMCC\_VER XXX*
4.  For Time dot Com, you might need to do additional steps. Please read “Implementation of FreePBX” scroll to the bottom for the key.
5.  Once you can see VLAN499 traffic in Torch, then you can create vlan interface with vlan id 499 on SFP interface. Add the vlan499 interface to internet\_bridge.  
     

![](/屏幕截图_2026-01-14_105238.png)

1.  Create PPOE interface on internet bridge.  
     

![](/屏幕截图_2026-01-14_105417.png)

1.  It is assumed that you already got firewall settings setup on PPOE interfaces that includes NAT, Mangle and etc + Routing.

## Firmware I used

M110\_sfp\_ODI\_240408.tar

If you buy from Taobao, you should be able to obtain the latest firmware from the seller. It usually works. 

Good Luck !