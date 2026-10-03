import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const fail=(m)=>{ console.error(`VALIDATION FAIL: ${m}`); process.exitCode=1; };
const manifestPath=resolve('validation/arttoo-standard.json');
if(!existsSync(manifestPath)){ fail('missing validation/arttoo-standard.json'); process.exit(); }
const m=JSON.parse(readFileSync(manifestPath,'utf8'));
const plan=readFileSync(resolve(m.authority.canonicalPlan),'utf8');
const required=['editor-core','virtual-try-on','tattoo-generation','cover-up-planning','artist-profiles','design-marketplace','scheduling','platform-payments','artist-payouts','autonomous-company-operations'];
const ids=new Set(m.productBar.map(x=>x.id));
for(const id of required) if(!ids.has(id)) fail(`missing product-bar capability: ${id}`);
if(m.execution.currentTask!=='task-2-editor-core') fail('current task drift');
if(m.execution.nextBoundedUnit!=='task-2b2-raster-mask-erase') fail('next bounded unit drift');
if(m.execution.marketplaceBlockedUntil!=='task-6-pre-marketplace-acceptance') fail('marketplace gate drift');
if(!plan.includes('### Task 2: Professional editor core')) fail('canonical plan lost Task 2');
if(!plan.includes('### Task 6: Exact-size production/stencil and pre-marketplace acceptance')) fail('canonical plan lost Task 6');
if(!plan.includes('No marketplace implementation until this plan\'s acceptance journey is demonstrated.')) fail('pre-marketplace guard missing');
for(const x of m.productBar){
  if((x.id==='design-marketplace'||x.id==='scheduling'||x.id==='platform-payments'||x.id==='artist-payouts') && x.state!=='blocked-pre-marketplace') fail(`${x.id} advanced before Task 6`);
}
if(process.exitCode) process.exit(process.exitCode);
console.log('ARTTOO validation gate PASS');
console.log(`current=${m.execution.currentTask}; next=${m.execution.nextBoundedUnit}; productBar=${m.productBar.length}`);
