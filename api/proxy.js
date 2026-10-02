export default async function handler(req) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  const body = await req.json();
  const SUPABASE_URL = "https://yiedgsxpnaiahgnghcrn.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZWRnc3hwbmFpYWhnbmdoY3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NTMwODQsImV4cCI6MjEwNjQyOTA4NH0.tEP8wsQKCa3QNwDL-KBdjbLAIB8GUtLX0saJoXTLAf8";
  const { table, op, payload } = body;
  let url = `${SUPABASE_URL}/rest/v1/${table}`;
  let fetchOpt = {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json"
    }
  };

  if(op === "select"){
    fetchOpt.method = "GET";
    if(payload?.order){
      url += `?order=${payload.order}`;
    }else if(payload?.eq){
      url += `?${payload.eq}`;
    }
  }else if(op === "insert"){
    fetchOpt.method = "POST";
    fetchOpt.body = JSON.stringify(payload.data);
  }else if(op === "update"){
    fetchOpt.method = "PATCH";
    fetchOpt.body = JSON.stringify(payload.data);
    url += `?${payload.eq}`;
  }else if(op === "delete"){
    fetchOpt.method = "DELETE";
    url += `?${payload.eq}`;
  }
  const res = await fetch(url, fetchOpt);
  const data = await res.json();
  return Response.json({data}, {headers:corsHeaders});
}
