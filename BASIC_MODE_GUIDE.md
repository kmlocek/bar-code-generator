# Basic Mode Configuration Guide

## Overview
The barcode label generator now has two modes: **Basic** and **Advanced**.

## Basic Mode

Basic mode is designed for quick label generation with automatic numbering.

### Configuration Options:

1. **Code Length**
   - Total length of each barcode (including prefix and counter)
   - Example: 10 digits

2. **Prefix Strategy**
   - **Date**: Uses current date in YYMMDD format
     - Example: November 14, 2025 → 251114
   - **Static**: User-defined prefix number

3. **Start Offset**
   - Starting counter number (default is 0)
   - Example: Offset 5 means first group starts at counter 5
   - Useful for continuing from a previous batch

4. **Count of 5s**
   - Number of 5-label groups
   - Each group generates 5 labels (mother 0 + children 1-4)
   - Example: 2 groups = 10 labels total

5. **Count of 10s**
   - Number of 10-label groups
   - Each group generates 10 labels (mother 0 + children 1-9)
   - Example: 1 group = 10 labels total

### Example Output

**Configuration:**
- Code Length: 10
- Prefix Strategy: Date (today = 14.11.2025 → 251114)
- Start Offset: 0
- Count of 5s: 2
- Count of 10s: 0

**Generated Labels:**
```
2511140000  (Group 0, mother)
2511140001  (Group 0, child 1)
2511140002  (Group 0, child 2)
2511140003  (Group 0, child 3)
2511140004  (Group 0, child 4)
2511140010  (Group 1, mother)
2511140011  (Group 1, child 1)
2511140012  (Group 1, child 2)
2511140013  (Group 1, child 3)
2511140014  (Group 1, child 4)
```

### Example with Offset

**Configuration:**
- Code Length: 10
- Prefix Strategy: Date (today = 14.11.2025 → 251114)
- Start Offset: 5
- Count of 5s: 2
- Count of 10s: 0

**Generated Labels:**
```
2511140050  (Group 5, mother)
2511140051  (Group 5, child 1)
2511140052  (Group 5, child 2)
2511140053  (Group 5, child 3)
2511140054  (Group 5, child 4)
2511140060  (Group 6, mother)
2511140061  (Group 6, child 1)
2511140062  (Group 6, child 2)
2511140063  (Group 6, child 3)
2511140064  (Group 6, child 4)
```

## Advanced Mode

Advanced mode provides full manual control (previous functionality):
- Regular Labels: Individual numbers or ranges
- 5s: Base numbers that generate 0-4 suffix
- 10s: Base numbers that generate 0-9 suffix
