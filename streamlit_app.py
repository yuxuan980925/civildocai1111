import streamlit as st
import json
import time
import random
from datetime import datetime
import base64
# Import deployment functions with error handling
try:
    from streamlit_deploy import setup_deployment, display_deployment_info, get_deployment_status
except ImportError:
    # Fallback functions if streamlit_deploy is not available
    def setup_deployment():
        st.set_page_config(
            page_title="CivilDoc AI - Documentation Assistant",
            page_icon="🏗️",
            layout="wide",
            initial_sidebar_state="expanded"
        )
    
    def display_deployment_info():
        pass
    
    def get_deployment_status():
        return {
            "environment": "Local Development",
            "streamlit_version": st.__version__,
            "is_production": False
        }

# Setup deployment configuration
setup_deployment()

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        color: #1e40af;
        text-align: center;
        margin-bottom: 2rem;
        font-weight: bold;
    }
    
    .sub-header {
        font-size: 1.2rem;
        color: #6b7280;
        text-align: center;
        margin-bottom: 3rem;
    }
    
    .document-card {
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 1rem 0;
        background-color: #f9fafb;
        transition: all 0.3s ease;
    }
    
    .document-card:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .status-draft {
        background-color: #fef3c7;
        color: #92400e;
    }
    
    .status-completed {
        background-color: #d1fae5;
        color: #065f46;
    }
    
    .status-review {
        background-color: #dbeafe;
        color: #1e40af;
    }
    
    .task-card {
        border-left: 4px solid #3b82f6;
        background-color: #f8fafc;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 0 0.5rem 0.5rem 0;
    }
    
    .complexity-high {
        border-left-color: #ef4444;
    }
    
    .complexity-medium {
        border-left-color: #f59e0b;
    }
    
    .complexity-low {
        border-left-color: #10b981;
    }
    
    .stProgress > div > div > div > div {
        background-color: #3b82f6;
    }
</style>
""", unsafe_allow_html=True)

# Load mock data
@st.cache_data
def load_mock_data():
    return {
        "documents": [
            {
                "id": "doc-1",
                "title": "Highway Design Report",
                "date": "2023-10-15",
                "status": "Draft",
                "preview": "This report outlines the design specifications for the A42 highway extension project including traffic flow analysis, structural requirements, and environmental considerations..."
            },
            {
                "id": "doc-2",
                "title": "Structural Analysis - B24 Bridge",
                "date": "2023-09-28",
                "status": "Completed",
                "preview": "Comprehensive structural integrity analysis of the B24 bridge over River Thames, including load capacity assessments and material stress evaluations..."
            },
            {
                "id": "doc-3",
                "title": "Soil Testing Report - NW Region",
                "date": "2023-11-02",
                "status": "In Review",
                "preview": "Detailed results of soil composition and stability testing in the North West development area, covering geological surveys and foundation recommendations..."
            }
        ],
        "agentTasks": [
            {
                "id": "task-1",
                "title": "Generate Environmental Impact Report",
                "description": "Create a comprehensive environmental impact assessment for the London Underground extension project, including air quality, noise pollution, and ecosystem effects analysis",
                "estimatedTime": "45 minutes",
                "complexity": "High",
                "status": "Available"
            },
            {
                "id": "task-2",
                "title": "Extract Data from Building Plans",
                "description": "Automatically extract key measurements, specifications, and technical details from uploaded architectural and engineering building plans using AI-powered document analysis",
                "estimatedTime": "15 minutes",
                "complexity": "Medium",
                "status": "Available"
            },
            {
                "id": "task-3",
                "title": "Compliance Check - Building Regulations",
                "description": "Perform automated compliance verification against current UK building regulations, safety codes, and industry standards with detailed flagging of potential issues",
                "estimatedTime": "30 minutes",
                "complexity": "High",
                "status": "Available"
            }
        ]
    }

# Helper functions
def get_status_class(status):
    status_map = {
        "Draft": "status-draft",
        "Completed": "status-completed", 
        "In Review": "status-review"
    }
    return status_map.get(status, "status-draft")

def get_complexity_class(complexity):
    complexity_map = {
        "High": "complexity-high",
        "Medium": "complexity-medium",
        "Low": "complexity-low"
    }
    return complexity_map.get(complexity, "complexity-medium")

# Initialize session state
if 'current_page' not in st.session_state:
    st.session_state.current_page = 'home'
if 'selected_document' not in st.session_state:
    st.session_state.selected_document = None
if 'selected_task' not in st.session_state:
    st.session_state.selected_task = None
if 'task_running' not in st.session_state:
    st.session_state.task_running = False
if 'edit_mode' not in st.session_state:
    st.session_state.edit_mode = False

# Sidebar navigation
st.sidebar.markdown("## 🏗️ CivilDoc AI")
st.sidebar.markdown("*AI-Powered Documentation Assistant*")
st.sidebar.markdown("---")

# Navigation buttons
if st.sidebar.button("🏠 Home", use_container_width=True):
    st.session_state.current_page = 'home'
    st.rerun()

if st.sidebar.button("📄 Document Management", use_container_width=True):
    st.session_state.current_page = 'documents'
    st.rerun()

if st.sidebar.button("🤖 AI Agent Tasks", use_container_width=True):
    st.session_state.current_page = 'ai_tasks'
    st.rerun()

st.sidebar.markdown("---")
st.sidebar.markdown("### Quick Actions")
if st.sidebar.button("✨ Try Demo Features", use_container_width=True):
    st.sidebar.success("Demo features are fully interactive!")

st.sidebar.markdown("---")
# Display deployment info in sidebar
status = get_deployment_status()
st.sidebar.markdown(f"**Environment:** {status['environment']}")
st.sidebar.markdown(f"**Streamlit:** v{status['streamlit_version']}")

# Add deployment info expander
display_deployment_info()

# Load data
data = load_mock_data()

# Main content based on current page
if st.session_state.current_page == 'home':
    # Home page
    st.markdown('<h1 class="main-header">🏗️ CivilDoc AI</h1>', unsafe_allow_html=True)
    st.markdown('<p class="sub-header">AI-Powered Documentation Assistant for Civil Engineers</p>', unsafe_allow_html=True)
    
    # Feature highlights
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        ### 📄 Smart Document Management
        - Automated document creation
        - Version control and collaboration
        - AI-powered content suggestions
        - Professional templates
        """)
    
    with col2:
        st.markdown("""
        ### 🤖 AI Agent Automation
        - Automated report generation
        - Data extraction from plans
        - Compliance checking
        - Real-time progress tracking
        """)
    
    with col3:
        st.markdown("""
        ### 📊 Data Analysis
        - Intelligent data processing
        - Visualization and charts
        - Technical specifications
        - Quality control metrics
        """)
    
    st.markdown("---")
    
    # Quick stats
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Documents", "3", "2 this month")
    with col2:
        st.metric("AI Tasks Available", "3", "100% success rate")
    with col3:
        st.metric("Processing Time", "< 2 min", "⚡ Fast")
    with col4:
        st.metric("Accuracy", "99.5%", "✅ Reliable")

elif st.session_state.current_page == 'documents':
    # Document Management page
    st.markdown("# 📄 Document Management")
    st.markdown("Manage your engineering documents with AI-powered assistance")
    
    # Add new document button
    col1, col2 = st.columns([3, 1])
    with col2:
        if st.button("➕ New Document", use_container_width=True):
            st.success("New document creation feature would open here!")
    
    st.markdown("---")
    
    # Document list
    for doc in data["documents"]:
        status_class = get_status_class(doc["status"])
        
        with st.container():
            st.markdown(f"""
            <div class="document-card">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
                    <h3 style="margin: 0; color: #1f2937;">{doc['title']}</h3>
                    <span class="status-badge {status_class}">{doc['status']}</span>
                </div>
                <p style="color: #6b7280; margin-bottom: 1rem;">{doc['preview']}</p>
                <div style="display: flex; justify-content: between; align-items: center;">
                    <small style="color: #9ca3af;">Created: {doc['date']}</small>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            col1, col2, col3 = st.columns([1, 1, 2])
            with col1:
                if st.button(f"👁️ View", key=f"view_{doc['id']}"):
                    st.session_state.selected_document = doc
                    st.session_state.edit_mode = False
            with col2:
                if st.button(f"✏️ Edit", key=f"edit_{doc['id']}"):
                    st.session_state.selected_document = doc
                    st.session_state.edit_mode = True
    
    # Document detail view
    if st.session_state.selected_document:
        st.markdown("---")
        doc = st.session_state.selected_document
        
        col1, col2 = st.columns([3, 1])
        with col1:
            st.markdown(f"## 📋 {doc['title']}")
        with col2:
            if st.button("❌ Close"):
                st.session_state.selected_document = None
                st.rerun()
        
        # Document metadata
        col1, col2, col3 = st.columns(3)
        with col1:
            st.info(f"**Status:** {doc['status']}")
        with col2:
            st.info(f"**Created:** {doc['date']}")
        with col3:
            st.info(f"**Type:** Engineering Report")
        
        # Document content
        if st.session_state.edit_mode:
            st.markdown("### ✏️ Edit Mode")
            content = st.text_area(
                "Document Content",
                value=f"{doc['preview']}\n\nThis section contains the detailed document content. In a real application, this would display the complete engineering document content, including:\n\n1. Project Overview\n2. Technical Specifications\n3. Design Drawings\n4. Materials List\n5. Construction Plan\n6. Quality Control Standards\n7. Safety Requirements\n8. Environmental Impact Assessment\n\nUsers can directly edit document content here, with AI assistant providing real-time suggestions and formatting help.",
                height=300
            )
            
            # AI Writing Assistant
            st.markdown("### 🤖 AI Writing Assistant")
            with st.expander("AI Suggestions", expanded=True):
                st.success("💡 **Suggestion:** You can add more technical details to improve this report")
                st.info("📊 **Detected:** Document lacks data charts, would you like AI to generate relevant charts?")
                st.success("✅ **Format Check:** Document structure meets engineering standards")
                
                col1, col2, col3 = st.columns(3)
                with col1:
                    if st.button("📊 Generate Charts"):
                        st.success("Chart generation would start here!")
                with col2:
                    if st.button("🔍 Check Compliance"):
                        st.success("Compliance check would run here!")
                with col3:
                    if st.button("✨ Optimize Content"):
                        st.success("Content optimization would begin here!")
            
            if st.button("💾 Save Changes", type="primary"):
                st.success("Document saved successfully!")
                st.session_state.edit_mode = False
                st.rerun()
        else:
            st.markdown("### 📄 Document Content")
            st.markdown(doc['preview'])
            st.markdown("""
            #### Document Details
            
            This section contains the detailed document content. In a real application, this would display the complete engineering document content, including:
            
            1. **Project Overview**
            2. **Technical Specifications**  
            3. **Design Drawings**
            4. **Materials List**
            5. **Construction Plan**
            6. **Quality Control Standards**
            7. **Safety Requirements**
            8. **Environmental Impact Assessment**
            
            Users can directly edit document content here, with AI assistant providing real-time suggestions and formatting help.
            """)

elif st.session_state.current_page == 'ai_tasks':
    # AI Agent Tasks page
    st.markdown("# 🤖 AI Agent Tasks")
    st.markdown("Select a task for the AI agent to complete for you")
    
    st.markdown("---")
    
    # Task list
    for task in data["agentTasks"]:
        complexity_class = get_complexity_class(task["complexity"])
        
        with st.container():
            st.markdown(f"""
            <div class="task-card {complexity_class}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <h3 style="margin: 0; color: #1f2937;">{task['title']}</h3>
                    <span class="status-badge" style="background-color: #f3f4f6; color: #374151;">{task['complexity']} Complexity</span>
                </div>
                <p style="color: #6b7280; margin-bottom: 1rem;">{task['description']}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <small style="color: #9ca3af;">⏱️ Estimated Time: {task['estimatedTime']}</small>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            if st.button(f"🚀 Launch Task", key=f"launch_{task['id']}"):
                st.session_state.selected_task = task
                st.session_state.task_running = True
                st.rerun()
    
    # Task execution view
    if st.session_state.selected_task and st.session_state.task_running:
        st.markdown("---")
        task = st.session_state.selected_task
        
        col1, col2 = st.columns([3, 1])
        with col1:
            st.markdown(f"## 🔄 Executing: {task['title']}")
        with col2:
            if st.button("⏹️ Stop Task"):
                st.session_state.task_running = False
                st.session_state.selected_task = None
                st.rerun()
        
        # Task info
        col1, col2, col3 = st.columns(3)
        with col1:
            st.info(f"**Complexity:** {task['complexity']}")
        with col2:
            st.info(f"**Estimated Time:** {task['estimatedTime']}")
        with col3:
            st.info("**Status:** Running")
        
        st.markdown("### 📋 Execution Steps")
        
        # Execution steps
        steps = [
            {"name": "Analyze Project Scope", "desc": "Collect and analyze basic project information"},
            {"name": "Environmental Data Collection", "desc": "Gather relevant environmental data and historical records"},
            {"name": "Impact Assessment Analysis", "desc": "Analyze potential environmental impacts of the project"},
            {"name": "Mitigation Measures Recommendation", "desc": "Propose environmental protection and mitigation measures"},
            {"name": "Generate Final Report", "desc": "Integrate all information to generate complete report"}
        ]
        
        # Simulate progress
        if 'step_progress' not in st.session_state:
            st.session_state.step_progress = 0
        
        progress_bar = st.progress(st.session_state.step_progress / len(steps))
        
        for i, step in enumerate(steps):
            if i < st.session_state.step_progress:
                st.success(f"✅ **{step['name']}** - {step['desc']}")
            elif i == st.session_state.step_progress:
                st.info(f"🔄 **{step['name']}** - {step['desc']} (In Progress...)")
            else:
                st.write(f"⏳ **{step['name']}** - {step['desc']}")
        
        # Auto-progress simulation
        if st.session_state.step_progress < len(steps):
            time.sleep(0.1)  # Small delay for demo
            if random.random() < 0.3:  # 30% chance to progress each refresh
                st.session_state.step_progress += 1
            st.rerun()
        else:
            st.success("🎉 Task completed successfully!")
            
            # Generated content
            st.markdown("### 📄 Generated Content Preview")
            with st.expander("Environmental Impact Report", expanded=True):
                st.markdown("""
                #### Report Outline:
                
                1. **Project Overview and Background**
                2. **Environmental Baseline Survey** 
                3. **Potential Environmental Impact Analysis**
                4. **Environmental Protection Measures**
                5. **Monitoring and Management Plan**
                
                ✅ **Report generation completed, meets environmental department requirements**
                """)
                
                if st.button("📥 Download Report"):
                    st.success("Report download would start here!")
            
            if st.button("🔄 Run Another Task"):
                st.session_state.task_running = False
                st.session_state.selected_task = None
                st.session_state.step_progress = 0
                st.rerun()

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #9ca3af; font-size: 0.875rem;">
    © 2023 CivilDoc AI - AI-Powered Documentation Assistant for Civil Engineers | Streamlit Demo
</div>
""", unsafe_allow_html=True)
