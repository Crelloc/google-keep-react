#!/bin/bash

chmod 664 custom_firewall.service
chmod 744 firewallsetup/firewall*
cp custom_firewall.service /etc/systemd/system
cp -R firewallsetup /etc
systemctl daemon-reload
systemctl enable custom_firewall.service

