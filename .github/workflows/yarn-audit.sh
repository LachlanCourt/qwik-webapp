#!/bin/bash

yarn audit
audit_exit_code=$?

echo yarn audit exited with code $audit_exit_code
if [ $audit_exit_code -le 6 ]; then
    exit 0
else
    exit 1
fi