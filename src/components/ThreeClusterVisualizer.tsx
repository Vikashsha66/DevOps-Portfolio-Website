import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Server, Activity, Shield, RefreshCw, Zap, Maximize2, Layers, CheckCircle2 } from 'lucide-react';
import { INITIAL_CLUSTER_NODES } from '../data/portfolioData';
import { ClusterNode } from '../types';

export const ThreeClusterVisualizer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<ClusterNode>(INITIAL_CLUSTER_NODES[0]);
  const [topologyMode, setTopologyMode] = useState<'k8s' | 'vpc' | 'mlops'>('k8s');
  const [isSurgeActive, setIsSurgeActive] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeNodes, setActiveNodes] = useState<ClusterNode[]>(INITIAL_CLUSTER_NODES);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodeMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const packetParticlesRef = useRef<THREE.Points | null>(null);
  const reqAnimRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020617, 0.04);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 3.5, 7.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x10b981, 3, 20);
    pointLight.position.set(0, 4, 2);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.5, 20);
    cyanLight.position.set(0, -3, -2);
    scene.add(cyanLight);

    // Root Group for Rotation
    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(14, 28, 0x10b981, 0x1e293b);
    gridHelper.position.y = -2.6;
    clusterGroup.add(gridHelper);

    // Nodes Map
    nodeMeshesRef.current.clear();

    // Node geometry generator
    activeNodes.forEach((node) => {
      let geo: THREE.BufferGeometry;
      let color = 0x10b981; // emerald for worker

      if (node.type === 'master') {
        geo = new THREE.DodecahedronGeometry(0.55, 0);
        color = 0xf59e0b; // amber for control plane
      } else if (node.type === 'ingress') {
        geo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
        color = 0x06b6d4; // cyan for ingress
      } else if (node.type === 'ml-node') {
        geo = new THREE.OctahedronGeometry(0.65, 0);
        color = 0xa855f7; // purple for MLOps GPU
      } else {
        geo = new THREE.IcosahedronGeometry(0.5, 1);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: false,
        emissive: color,
        emissiveIntensity: 0.25,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(node.coordinates[0], node.coordinates[1], node.coordinates[2]);
      mesh.userData = { nodeId: node.id };

      // Add wireframe outer shell for high-tech holographic look
      const wireMat = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const wireMesh = new THREE.Mesh(geo.clone().scale(1.2, 1.2, 1.2), wireMat);
      mesh.add(wireMesh);

      // Add mini pod satellites
      const podCount = node.pods.length;
      for (let i = 0; i < podCount; i++) {
        const podGeo = new THREE.SphereGeometry(0.1, 8, 8);
        const podMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
        const podMesh = new THREE.Mesh(podGeo, podMat);
        const angle = (i / podCount) * Math.PI * 2;
        const radius = 0.9;
        podMesh.position.set(Math.cos(angle) * radius, (Math.sin(angle) * 0.4), Math.sin(angle) * radius);
        mesh.add(podMesh);
      }

      clusterGroup.add(mesh);
      nodeMeshesRef.current.set(node.id, mesh);
    });

    // Connection lines between Master and Workers / Ingress
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });

    const masterCoord = activeNodes.find(n => n.type === 'master')?.coordinates || [0, 1.2, 0];
    activeNodes.forEach(node => {
      if (node.type !== 'master') {
        const points = [];
        points.push(new THREE.Vector3(masterCoord[0], masterCoord[1], masterCoord[2]));
        points.push(new THREE.Vector3(node.coordinates[0], node.coordinates[1], node.coordinates[2]));
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeo, lineMat);
        clusterGroup.add(line);
      }
    });

    // Ingress to worker lines
    const ingressCoord = activeNodes.find(n => n.type === 'ingress')?.coordinates;
    if (ingressCoord) {
      activeNodes.filter(n => n.type === 'worker' || n.type === 'ml-node').forEach(node => {
        const points = [
          new THREE.Vector3(ingressCoord[0], ingressCoord[1], ingressCoord[2]),
          new THREE.Vector3(node.coordinates[0], node.coordinates[1], node.coordinates[2])
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const dashLineMat = new THREE.LineDashedMaterial({
          color: 0x06b6d4,
          dashSize: 0.2,
          gapSize: 0.1,
          transparent: true,
          opacity: 0.35,
        });
        const line = new THREE.Line(lineGeo, dashLineMat);
        line.computeLineDistances();
        clusterGroup.add(line);
      });
    }

    // Streaming Data Packet Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const packetParticles = new THREE.Points(particleGeo, particleMat);
    clusterGroup.add(packetParticles);
    packetParticlesRef.current = packetParticles;

    // Mouse Interaction (Raycasting & Dragging)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        clusterGroup.rotation.y += deltaX * 0.006;
        clusterGroup.rotation.x = Math.max(-0.6, Math.min(0.6, clusterGroup.rotation.x + deltaY * 0.006));
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }

      // Raycast hover check
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onMouseUp = (e: MouseEvent) => {
      isDragging = false;

      // Click detection
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const meshes = Array.from(nodeMeshesRef.current.values()) as THREE.Object3D[];
      const intersects = raycaster.intersectObjects(meshes, true);
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const nodeId = clickedMesh.userData.nodeId;
        const foundNode = activeNodes.find(n => n.id === nodeId);
        if (foundNode) {
          setSelectedNode(foundNode);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        clusterGroup.rotation.y += deltaX * 0.008;
        clusterGroup.rotation.x = Math.max(-0.6, Math.min(0.6, clusterGroup.rotation.x + deltaY * 0.008));
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => { isDragging = false; };

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize Observer
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height || 450;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speedMultiplier = isSurgeActive ? 2.5 : 1.0;

      // Auto rotation
      if (autoRotate && !isDragging) {
        clusterGroup.rotation.y += 0.003 * speedMultiplier;
      }

      // Pulse meshes
      nodeMeshesRef.current.forEach((mesh) => {
        mesh.rotation.y += 0.01 * speedMultiplier;
        mesh.rotation.x += 0.005;
      });

      // Animate packet particles along paths
      if (packetParticlesRef.current) {
        const positions = packetParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += Math.sin(elapsedTime * 2 + i) * 0.005 * speedMultiplier;
        }
        packetParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(reqAnimRef.current);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, [activeNodes, isSurgeActive, autoRotate]);

  // Handle Simulated Traffic Surge
  const triggerTrafficSurge = () => {
    setIsSurgeActive(true);
    // temporarily increase node loads
    setActiveNodes(prev =>
      prev.map(node => ({
        ...node,
        cpuPercent: Math.min(96, Math.floor(node.cpuPercent * 1.35)),
        memoryPercent: Math.min(94, Math.floor(node.memoryPercent * 1.2)),
      }))
    );

    setTimeout(() => {
      setIsSurgeActive(false);
      setActiveNodes(INITIAL_CLUSTER_NODES);
    }, 6000);
  };

  return (
    <section id="topology" className="py-20 bg-[#0a0a0c] border-t border-b border-white/10 relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest mb-3 backdrop-blur-md">
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive 3D WebGL Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              3D Cloud Resource Topology
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
              Real-time multi-dimensional visualization of Kubernetes cluster nodes, ingress controllers, pod scheduling, and network latency packets.
            </p>
          </div>

          {/* Interactive Mode & Surge Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={triggerTrafficSurge}
              disabled={isSurgeActive}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                isSurgeActive
                  ? 'bg-cyan-500 text-black shadow-[0_0_25px_rgba(6,182,212,0.6)] animate-pulse'
                  : 'bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-cyan-500/50 shadow-lg'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isSurgeActive ? 'text-black animate-spin' : 'text-cyan-400'}`} />
              <span>{isSurgeActive ? 'Surge Active (12.4k req/s)' : 'Simulate Traffic Spike'}</span>
            </button>

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2.5 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                autoRotate
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
              }`}
              title="Toggle Auto-Rotation"
              aria-label="Toggle Auto-Rotation"
            >
              <RefreshCw className={`w-4 h-4 ${autoRotate ? 'animate-spin text-cyan-400' : ''}`} style={{ animationDuration: '10s' }} />
            </button>
          </div>
        </div>

        {/* 3D Canvas + HUD Telemetry Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main 3D Canvas Box */}
          <div className="lg:col-span-8 bg-black/60 border border-white/15 rounded-xl overflow-hidden relative shadow-2xl backdrop-blur-xl flex flex-col min-h-[440px]">
            
            {/* Overlay Top Bar */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)] animate-pulse" />
                  EKS Cluster ap-south-1
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-slate-300 hidden sm:inline-block">
                  Nodes: 5 | Pods: 18
                </span>
              </div>

              <div className="pointer-events-auto text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-black/70 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                Click node &bull; Drag to rotate
              </div>
            </div>

            {/* Canvas Container */}
            <div
              ref={mountRef}
              className="w-full h-full min-h-[420px] flex-1 cursor-grab active:cursor-grabbing"
            />

            {/* Overlay Bottom Legend */}
            <div className="p-3 bg-white/5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono backdrop-blur-md">
              <div className="flex flex-wrap items-center gap-4 text-slate-300 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                  <span>Control Plane</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                  <span>Worker Node</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                  <span>Ingress Gateway</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.5)]" />
                  <span>MLOps GPU Node</span>
                </div>
              </div>
              <div className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                Network Latency: <strong className="text-cyan-400">0.8ms</strong>
              </div>
            </div>
          </div>

          {/* Right HUD: Selected Node Telemetry & Pod Inspector */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            
            {/* Selected Node Details Card */}
            <div className="bg-black/60 border border-white/15 rounded-xl p-5 shadow-2xl backdrop-blur-xl flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">
                    Node Telemetry HUD
                  </span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-bold uppercase tracking-wider">
                  {selectedNode.status}
                </span>
              </div>

              {/* Node Header */}
              <div className="space-y-1 mb-4">
                <div className="text-base sm:text-lg font-bold text-white font-mono">{selectedNode.name}</div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-3">
                  <span>Zone: <strong className="text-slate-200">{selectedNode.zone}</strong></span>
                  <span className="text-white/20">&bull;</span>
                  <span>Type: <strong className="text-cyan-400 uppercase">{selectedNode.type}</strong></span>
                </div>
              </div>

              {/* Resource Gauges */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>CPU Load</span>
                    <span className="text-cyan-400 font-bold">{selectedNode.cpuPercent}%</span>
                  </div>
                  <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        selectedNode.cpuPercent > 80 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                      }`}
                      style={{ width: `${selectedNode.cpuPercent}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Memory</span>
                    <span className="text-blue-400 font-bold">{selectedNode.memoryPercent}%</span>
                  </div>
                  <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        selectedNode.memoryPercent > 80 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                      }`}
                      style={{ width: `${selectedNode.memoryPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Running Pods on this Node */}
              <div className="flex-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Scheduled Pods ({selectedNode.pods.length})</span>
                  <span className="text-[10px] text-cyan-400 font-bold">ALL HEALTHY</span>
                </div>
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {selectedNode.pods.map((pod, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start justify-between text-xs font-mono"
                    >
                      <div className="overflow-hidden mr-2">
                        <div className="text-slate-200 font-medium truncate">{pod.name}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="text-cyan-400">ns/{pod.namespace}</span>
                          <span className="text-white/20">&bull;</span>
                          <span className="truncate">{pod.image}</span>
                        </div>
                      </div>
                      <span className="shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                        {pod.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Node Switcher Buttons */}
              <div className="pt-4 border-t border-white/10 mt-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">Switch Node Focus:</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeNodes.map(node => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        selectedNode.id === node.id
                          ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                          : 'bg-white/5 text-slate-300 border border-white/10 hover:border-white/30'
                      }`}
                    >
                      {node.name.replace('k8s-', '')}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
