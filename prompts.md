# Prompts for Simple Time MCP

This document contains example prompts for using the Simple Time MCP server.

## Basic Usage Prompts

### Get Current Time
```
What time is it right now?
```

### Get Current Date
```
What's today's date?
```

### Get Full Date and Time
```
What's the current date and time?
```

## Advanced Usage

### Time Zone Queries
```
Get the current time in full format
```

### Date Formatting
```
Show me just the date, not the time
```

## Integration Examples

### In MCP Client Conversations
```
User: I need to know what time it is
Assistant: [Uses get_time tool with format="time"]
```

```
User: What day is it today?
Assistant: [Uses get_time tool with format="date"]
```


