/* Course figure registries — injected verbatim into the site template at __FIGS__.
   Contract: define const FIGS (id -> {title, pillar, caption, draw}), FIG_EXAM
   ("<examid>_Q<n>" -> [figure ids]), FIG_TOPIC_MAP and FIG_MEMO_MAP
   ([[keyword-regex, figure id], ...]). Generators (figScatter/figHist/figQQ/
   figBox/figCanvas...) are defined by the engine template before this point. */
const FIGS = {
  vi_contraction: {
    title: "Value iteration is a γ-contraction",
    pillar: "Planning",
    caption: "Computed: value iteration on a fixed 3-state, 2-action MDP (γ=0.9). The max-norm error ‖Vₖ−V*‖∞ (purple) stays under the γᵏ‖V₀−V*‖∞ envelope (dashed) at every step — the contraction that makes VI converge geometrically (Lecture 4).",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const col = cssVar("--exp"), muted = cssVar("--muted"), ink = cssVar("--ink");
      const g = 0.9, R = [[5,0,1],[2,3,0]];
      const P = [[[0.7,0.3,0],[0.2,0.8,0],[0,0.5,0.5]],[[0.9,0.1,0],[0,0.6,0.4],[0.3,0,0.7]]];
      const back = V => [0,1,2].map(s => Math.max(
        R[0][s]+g*P[0][s].reduce((x,p,sp)=>x+p*V[sp],0),
        R[1][s]+g*P[1][s].reduce((x,p,sp)=>x+p*V[sp],0)));
      let Vs=[0,0,0]; for(let i=0;i<400;i++) Vs=back(Vs);
      let V=[0,0,0]; const errs=[];
      for(let k=0;k<24;k++){ errs.push(Math.max(Math.abs(V[0]-Vs[0]),Math.abs(V[1]-Vs[1]),Math.abs(V[2]-Vs[2]))); V=back(V); }
      const e0=errs[0], N=errs.length, x0=48,y0=16,w=W-72,h=H-52;
      const sx=k=>x0+k/(N-1)*w, sy=e=>y0+h-(e/e0)*h;
      ctx.strokeStyle=muted; ctx.globalAlpha=.5; ctx.strokeRect(x0,y0,w,h); ctx.globalAlpha=1;
      ctx.setLineDash([5,4]); ctx.strokeStyle=muted; ctx.lineWidth=1.5; ctx.beginPath();
      for(let k=0;k<N;k++){ const px=sx(k),py=sy(e0*Math.pow(g,k)); k?ctx.lineTo(px,py):ctx.moveTo(px,py);} ctx.stroke();
      ctx.setLineDash([]); ctx.strokeStyle=col; ctx.lineWidth=2.4; ctx.beginPath();
      for(let k=0;k<N;k++){ const px=sx(k),py=sy(errs[k]); k?ctx.lineTo(px,py):ctx.moveTo(px,py);} ctx.stroke();
      for(let k=0;k<N;k++){ ctx.fillStyle=col; ctx.beginPath(); ctx.arc(sx(k),sy(errs[k]),2.3,0,7); ctx.fill(); }
      ctx.fillStyle=col; ctx.font="13px "+cssVar("--serif"); ctx.fillText("‖Vₖ − V*‖∞", x0+10, y0+16);
      ctx.fillStyle=muted; ctx.fillText("γᵏ·‖V₀ − V*‖∞  (contraction bound)", x0+10, y0+34);
      ctx.fillStyle=ink; ctx.fillText("iteration k →", W-118, H-10);
    }
  },
  td_learning: {
    title: "TD(0) learns the value function",
    pillar: "Learning",
    caption: "Computed: TD(0) on the 5-state random walk (γ=1, α=0.1, fixed seed). The five estimates V(s) (teal) climb from 0 toward their true values s/6 (dashed) as episodes accumulate — model-free prediction, bootstrapping from sampled transitions (Lectures 6–7).",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const col = cssVar("--opt"), muted = cssVar("--muted"), ink = cssVar("--ink");
      let seed = 7; const rnd = () => (seed = (seed*1103515245+12345)&0x7fffffff)/0x7fffffff;
      const al=0.1, EP=140; const V=[0,0,0,0,0,0,0]; const hist=[[],[],[],[],[]];
      for(let e=0;e<EP;e++){
        let s=3;
        while(s>0 && s<6){ const sp = s + (rnd()<0.5?-1:1); const r = (sp===6)?1:0;
          V[s]+= al*(r + (sp>0&&sp<6?V[sp]:0) - V[s]); s=sp; }
        for(let i=1;i<=5;i++) hist[i-1].push(V[i]);
      }
      const x0=44,y0=14,w=W-64,h=H-46, sx=e=>x0+e/(EP-1)*w, sy=v=>y0+h-v*h;
      ctx.strokeStyle=muted; ctx.globalAlpha=.5; ctx.strokeRect(x0,y0,w,h); ctx.globalAlpha=1;
      ctx.setLineDash([4,4]); ctx.strokeStyle=muted; ctx.lineWidth=1;
      for(let i=1;i<=5;i++){ const y=sy(i/6); ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x0+w,y); ctx.stroke();
        ctx.fillStyle=muted; ctx.font="11px "+cssVar("--mono"); ctx.fillText((i)+"/6", x0-30, y+4); }
      ctx.setLineDash([]);
      for(let i=0;i<5;i++){ ctx.strokeStyle=col; ctx.globalAlpha=.45+.11*i; ctx.lineWidth=1.8; ctx.beginPath();
        hist[i].forEach((v,e)=>{ const px=sx(e),py=sy(v); e?ctx.lineTo(px,py):ctx.moveTo(px,py); }); ctx.stroke(); }
      ctx.globalAlpha=1; ctx.fillStyle=ink; ctx.font="13px "+cssVar("--serif"); ctx.fillText("episodes →", W-104, H-8);
      ctx.fillStyle=col; ctx.fillText("V(s) estimates", x0+8, y0+16);
    }
  },
  gridworld_policy: {
    title: "The optimal policy on a GridWorld",
    pillar: "Planning",
    caption: "Computed: value iteration on a 5×5 GridWorld (γ=0.9; goal top-right = +1 absorbing; a blocked cell). Cells shaded by V*; arrows are the greedy optimal action argmaxₐ Q*(s,a) — dynamic programming turning values into a policy (Lectures 3–4).",
    draw(cv) {
      const W = 340, H = 300, ctx = figCanvas(cv, W, H);
      const col = cssVar("--exp"), muted = cssVar("--muted"), ink = cssVar("--ink"), good = cssVar("--good");
      const n=5, g=0.9, goal=[0,4], wall=[2,2];
      const id=(r,c)=>r*n+c, isW=(r,c)=>r===wall[0]&&c===wall[1], isG=(r,c)=>r===goal[0]&&c===goal[1];
      const A=[[-1,0],[1,0],[0,-1],[0,1]];
      const step=(r,c,a)=>{ let nr=r+A[a][0], nc=c+A[a][1]; if(nr<0||nr>=n||nc<0||nc>=n||isW(nr,nc)) return [r,c]; return [nr,nc]; };
      let V=new Array(n*n).fill(0);
      for(let it=0;it<120;it++){ const nV=V.slice();
        for(let r=0;r<n;r++)for(let c=0;c<n;c++){ if(isW(r,c)||isG(r,c)) continue;
          let best=-1e9; for(let a=0;a<4;a++){ const [nr,nc]=step(r,c,a); const rew=isG(nr,nc)?1:0; best=Math.max(best,rew+g*V[id(nr,nc)]); }
          nV[id(r,c)]=best; } V=nV; }
      const vmax=Math.max(...V), cell=Math.min((W-20)/n,(H-20)/n), ox=(W-cell*n)/2, oy=(H-cell*n)/2;
      for(let r=0;r<n;r++)for(let c=0;c<n;c++){ const x=ox+c*cell, y=oy+r*cell;
        if(isW(r,c)){ ctx.fillStyle=muted; ctx.globalAlpha=.85; } else { ctx.fillStyle=col; ctx.globalAlpha=isG(r,c)?.9:0.12+0.6*(V[id(r,c)]/(vmax||1)); }
        ctx.fillRect(x+1,y+1,cell-2,cell-2); ctx.globalAlpha=1;
        ctx.strokeStyle=muted; ctx.globalAlpha=.4; ctx.strokeRect(x+1,y+1,cell-2,cell-2); ctx.globalAlpha=1;
        if(isG(r,c)){ ctx.fillStyle=good; ctx.font="bold 15px "+cssVar("--serif"); ctx.fillText("★", x+cell/2-6, y+cell/2+6); continue; }
        if(isW(r,c)) continue;
        let best=-1e9, ba=0; for(let a=0;a<4;a++){ const [nr,nc]=step(r,c,a); const rew=isG(nr,nc)?1:0; const q=rew+g*V[id(nr,nc)]; if(q>best){best=q;ba=a;} }
        const cx=x+cell/2, cy=y+cell/2, L=cell*0.26, dx=A[ba][1]*L, dy=A[ba][0]*L;
        ctx.strokeStyle=ink; ctx.fillStyle=ink; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx-dx,cy-dy); ctx.lineTo(cx+dx,cy+dy); ctx.stroke();
        const ang=Math.atan2(dy,dx); ctx.beginPath(); ctx.moveTo(cx+dx,cy+dy);
        ctx.lineTo(cx+dx-6*Math.cos(ang-0.5),cy+dy-6*Math.sin(ang-0.5)); ctx.lineTo(cx+dx-6*Math.cos(ang+0.5),cy+dy-6*Math.sin(ang+0.5)); ctx.closePath(); ctx.fill();
      }
    }
  },
  ucb_regret: {
    title: "UCB regret grows only like log T",
    pillar: "Bandits",
    caption: "Computed: UCB1 on 5 Bernoulli arms (means .50/.55/.60/.63/.65, fixed seed). Cumulative regret Σ(μ*−μₐₜ) (orange) is concave — sublinear, ≈ log T — far below the dashed linear 'keep-exploring' reference. Balancing exploration vs exploitation (Lecture 10).",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const col = cssVar("--gen"), muted = cssVar("--muted"), ink = cssVar("--ink");
      const mu=[.50,.55,.60,.63,.65], K=mu.length, best=Math.max(...mu), T=1500;
      let seed=91; const rnd=()=>(seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff;
      const n=new Array(K).fill(0), sum=new Array(K).fill(0); let reg=0; const curve=[];
      for(let t=1;t<=T;t++){ let a;
        if(t<=K){ a=t-1; } else { let bi=0,bv=-1e9; for(let i=0;i<K;i++){ const ucb=sum[i]/n[i]+Math.sqrt(2*Math.log(t)/n[i]); if(ucb>bv){bv=ucb;bi=i;} } a=bi; }
        const r=rnd()<mu[a]?1:0; n[a]++; sum[a]+=r; reg+=best-mu[a]; curve.push(reg);
      }
      const x0=44,y0=14,w=W-64,h=H-46, rmax=curve[T-1], sx=t=>x0+t/(T-1)*w, sy=v=>y0+h-(v/rmax)*h;
      ctx.strokeStyle=muted; ctx.globalAlpha=.5; ctx.strokeRect(x0,y0,w,h); ctx.globalAlpha=1;
      // dashed reference: regret if you kept pulling a fixed sub-optimal arm (linear in t)
      const slope=best-mu[2];
      ctx.setLineDash([5,4]); ctx.strokeStyle=muted; ctx.lineWidth=1.4; ctx.beginPath();
      ctx.moveTo(sx(0),sy(0)); ctx.lineTo(sx(T-1), sy(Math.min(rmax, slope*T))); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle=col; ctx.lineWidth=2.4; ctx.beginPath();
      curve.forEach((v,t)=>{ const px=sx(t),py=sy(v); t?ctx.lineTo(px,py):ctx.moveTo(px,py); }); ctx.stroke();
      ctx.fillStyle=col; ctx.font="13px "+cssVar("--serif"); ctx.fillText("UCB regret (≈ log T)", x0+10, y0+h-10);
      ctx.fillStyle=muted; ctx.fillText("linear reference", x0+w-118, y0+16);
      ctx.fillStyle=ink; ctx.fillText("round t →", W-96, H-8);
    }
  },
  mdp_diagram: {
    title: "An MDP as a transition diagram",
    pillar: "Planning",
    caption: "The objects a Markov decision process is built from: states (circles), actions (colored edges), each edge labeled with its transition probability and immediate reward P(s'|s,a) / r. From state s₁ action a (purple) splits 0.8/0.2; action b (orange) is a sure move. s₂ is absorbing. Every planning method — Bellman operators, value & policy iteration — runs on exactly this structure (Lectures 2–3).",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const ink = cssVar("--ink"), muted = cssVar("--muted"), a1 = cssVar("--exp"), a2 = cssVar("--gen"), good = cssVar("--good");
      const N = { s0:[120,150], s1:[330,150], s2:[540,110] };
      const rad = 30;
      function edge(p, q, col, off, lab, curve){
        const dx=q[0]-p[0], dy=q[1]-p[1], L=Math.hypot(dx,dy), ux=dx/L, uy=dy/L, nx=-uy, ny=ux;
        const sx=p[0]+ux*rad+nx*off, sy=p[1]+uy*rad+ny*off, ex=q[0]-ux*rad+nx*off, ey=q[1]-uy*rad+ny*off;
        const mx=(sx+ex)/2+nx*(curve||0), my=(sy+ey)/2+ny*(curve||0);
        ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=2.2;
        ctx.beginPath(); ctx.moveTo(sx,sy); ctx.quadraticCurveTo(mx,my,ex,ey); ctx.stroke();
        const ang=Math.atan2(ey-my,ex-mx);
        ctx.beginPath(); ctx.moveTo(ex,ey);
        ctx.lineTo(ex-9*Math.cos(ang-0.4),ey-9*Math.sin(ang-0.4));
        ctx.lineTo(ex-9*Math.cos(ang+0.4),ey-9*Math.sin(ang+0.4)); ctx.closePath(); ctx.fill();
        ctx.font="12px "+cssVar("--mono"); ctx.fillStyle=col;
        ctx.fillText(lab, mx-ctx.measureText(lab).width/2, my + (curve<0?-6:16));
      }
      function selfLoop(p, col, lab){
        ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=2.2;
        ctx.beginPath(); ctx.arc(p[0], p[1]-rad-14, 15, 0.6, Math.PI*2-0.2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(p[0]+11,p[1]-rad-6);
        ctx.lineTo(p[0]+6,p[1]-rad-14); ctx.lineTo(p[0]+16,p[1]-rad-15); ctx.closePath(); ctx.fill();
        ctx.font="12px "+cssVar("--mono"); ctx.fillText(lab, p[0]-ctx.measureText(lab).width/2, p[1]-rad-34);
      }
      edge(N.s0, N.s1, a2, 0, "b: p=1, r=0", -34);
      edge(N.s1, N.s2, a1, 0, "a: p=.8, r=+1", -26);
      edge(N.s1, N.s0, a1, -16, "a: p=.2, r=0", -40);
      selfLoop(N.s2, good, "p=1, r=0");
      for (const [k,[x,y]] of Object.entries(N)){
        ctx.beginPath(); ctx.arc(x,y,rad,0,7);
        if(k==="s2"){ ctx.globalAlpha=.18; ctx.fillStyle=good; ctx.fill(); ctx.globalAlpha=1; }
        else { ctx.fillStyle=cssVar("--surface2"); ctx.fill(); }
        ctx.lineWidth=2; ctx.strokeStyle=k==="s2"?good:muted; ctx.stroke();
        ctx.fillStyle=ink; ctx.font="15px "+cssVar("--serif");
        const t="s"+k[1]; ctx.fillText(t, x-ctx.measureText(t).width/2, y+5);
      }
      ctx.fillStyle=muted; ctx.font="12px "+cssVar("--sans"); ctx.fillText("s₂ absorbing (terminal)", 452, 200);
    }
  },
  policy_gradient: {
    title: "Policy gradient climbs the expected return",
    pillar: "Approximation",
    caption: "Computed: gradient ascent on a softmax policy over two actions (rewards 1.0 vs 0.3), following the policy-gradient theorem ∇J = E[r·∇log π]. Expected return J(θ) (orange) rises monotonically to the optimum (dashed) as the policy shifts probability onto the better action — no model, just the score-function estimator (Lecture 9, REINFORCE / actor-critic).",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const col = cssVar("--gen"), muted = cssVar("--muted"), ink = cssVar("--ink"), opt = cssVar("--opt");
      const r = [1.0, 0.3], lr = 0.9, IT = 60;
      let th = [0, 0]; const J = [], p0 = [];
      for (let k=0;k<IT;k++){
        const e0=Math.exp(th[0]), e1=Math.exp(th[1]), z=e0+e1, pi=[e0/z, e1/z];
        const j = pi[0]*r[0]+pi[1]*r[1]; J.push(j); p0.push(pi[0]);
        const grad = [pi[0]*(r[0]-j), pi[1]*(r[1]-j)];
        th = [th[0]+lr*grad[0], th[1]+lr*grad[1]];
      }
      const x0=44,y0=16,w=W-72,h=H-48, jmin=J[0], jmax=r[0];
      const sx=k=>x0+k/(IT-1)*w, sy=v=>y0+h-((v-jmin)/(jmax-jmin))*h;
      ctx.strokeStyle=muted; ctx.globalAlpha=.5; ctx.strokeRect(x0,y0,w,h); ctx.globalAlpha=1;
      ctx.setLineDash([5,4]); ctx.strokeStyle=muted; ctx.lineWidth=1.4;
      ctx.beginPath(); ctx.moveTo(x0,sy(jmax)); ctx.lineTo(x0+w,sy(jmax)); ctx.stroke(); ctx.setLineDash([]);
      // probability of the optimal action, faint, on same panel (0..1 → panel)
      ctx.strokeStyle=opt; ctx.globalAlpha=.5; ctx.lineWidth=1.8; ctx.beginPath();
      p0.forEach((v,k)=>{ const px=sx(k),py=y0+h-v*h; k?ctx.lineTo(px,py):ctx.moveTo(px,py); }); ctx.stroke(); ctx.globalAlpha=1;
      ctx.strokeStyle=col; ctx.lineWidth=2.4; ctx.beginPath();
      J.forEach((v,k)=>{ const px=sx(k),py=sy(v); k?ctx.lineTo(px,py):ctx.moveTo(px,py); }); ctx.stroke();
      for(let k=0;k<IT;k+=6){ ctx.fillStyle=col; ctx.beginPath(); ctx.arc(sx(k),sy(J[k]),2.4,0,7); ctx.fill(); }
      ctx.fillStyle=col; ctx.font="13px "+cssVar("--serif"); ctx.fillText("J(θ) = expected return", x0+10, y0+h-12);
      ctx.fillStyle=muted; ctx.fillText("optimum r* = 1.0", x0+w-116, sy(jmax)-6);
      ctx.fillStyle=opt; ctx.globalAlpha=.8; ctx.fillText("π(best action) →1", x0+10, y0+16); ctx.globalAlpha=1;
      ctx.fillStyle=ink; ctx.fillText("gradient step →", W-128, H-8);
    }
  }
};
const MOUNTED_FIGS = [];
const FIG_EXAM = {};  // no per-question exam figures yet for this course
const FIG_TOPIC_MAP = [
  [/value iteration|contraction|bellman operator/i, "vi_contraction"],
  [/temporal difference|td\(|monte.?carlo|model-free|q-learning/i, "td_learning"],
  [/mdp formal|optimal policy|policy iteration|grid|dynamic programming/i, "gridworld_policy"],
  [/bandit|ucb|regret|exploration|best.?arm/i, "ucb_regret"],
  [/mdp|markov decision|transition|state.?space|reward function/i, "mdp_diagram"],
  [/policy gradient|reinforce|actor.?critic|score function|function approximation/i, "policy_gradient"],
];
const FIG_MEMO_MAP = [
  [/value iteration|policy iteration/i, "vi_contraction"],
  [/bellman optimality operator/i, "vi_contraction"],
  [/td\(0\)|temporal difference|monte-carlo|q-learning/i, "td_learning"],
  [/discounted mdp|optimal policy/i, "gridworld_policy"],
  [/ucb|regret|best-arm/i, "ucb_regret"],
  [/mdp|markov decision|transition/i, "mdp_diagram"],
  [/policy gradient|reinforce|actor-critic|score function/i, "policy_gradient"],
];
// Solutions get a folded concept figure when the question's topic matches one.
