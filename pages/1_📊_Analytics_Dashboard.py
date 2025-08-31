import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

st.set_page_config(
    page_title="Analytics Dashboard - CivilDoc AI",
    page_icon="📊",
    layout="wide"
)

st.title("📊 Analytics Dashboard")
st.markdown("Real-time insights into your engineering documentation and AI task performance")

# Generate sample data
@st.cache_data
def generate_sample_data():
    # Document activity data
    dates = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
    doc_activity = pd.DataFrame({
        'date': dates,
        'documents_created': np.random.poisson(2, len(dates)),
        'documents_edited': np.random.poisson(5, len(dates)),
        'ai_tasks_completed': np.random.poisson(3, len(dates))
    })
    
    # Project types distribution
    project_types = pd.DataFrame({
        'type': ['Highway Design', 'Bridge Analysis', 'Soil Testing', 'Environmental Impact', 'Building Plans'],
        'count': [45, 32, 28, 19, 36],
        'ai_assistance_rate': [85, 92, 78, 95, 88]
    })
    
    # Task completion times
    task_times = pd.DataFrame({
        'task_type': ['Environmental Report', 'Data Extraction', 'Compliance Check'] * 10,
        'completion_time': np.random.normal([35, 12, 25], [8, 3, 5], 30),
        'accuracy': np.random.normal([96, 94, 98], [2, 3, 1], 30)
    })
    
    return doc_activity, project_types, task_times

doc_activity, project_types, task_times = generate_sample_data()

# Key Metrics Row
col1, col2, col3, col4 = st.columns(4)

with col1:
    total_docs = doc_activity['documents_created'].sum()
    st.metric(
        label="📄 Total Documents",
        value=f"{total_docs:,}",
        delta=f"+{doc_activity['documents_created'].tail(7).sum()} this week"
    )

with col2:
    total_tasks = doc_activity['ai_tasks_completed'].sum()
    st.metric(
        label="🤖 AI Tasks Completed", 
        value=f"{total_tasks:,}",
        delta=f"+{doc_activity['ai_tasks_completed'].tail(7).sum()} this week"
    )

with col3:
    avg_accuracy = task_times['accuracy'].mean()
    st.metric(
        label="🎯 Average Accuracy",
        value=f"{avg_accuracy:.1f}%",
        delta="+1.2% vs last month"
    )

with col4:
    avg_time = task_times['completion_time'].mean()
    st.metric(
        label="⏱️ Avg Completion Time",
        value=f"{avg_time:.1f} min",
        delta="-3.5 min improvement"
    )

st.markdown("---")

# Charts Row 1
col1, col2 = st.columns(2)

with col1:
    st.subheader("📈 Document Activity Trend")
    
    # Create activity trend chart
    fig_activity = go.Figure()
    
    fig_activity.add_trace(go.Scatter(
        x=doc_activity['date'],
        y=doc_activity['documents_created'].rolling(7).mean(),
        mode='lines',
        name='Documents Created',
        line=dict(color='#3b82f6')
    ))
    
    fig_activity.add_trace(go.Scatter(
        x=doc_activity['date'],
        y=doc_activity['ai_tasks_completed'].rolling(7).mean(),
        mode='lines',
        name='AI Tasks Completed',
        line=dict(color='#10b981')
    ))
    
    fig_activity.update_layout(
        height=400,
        showlegend=True,
        xaxis_title="Date",
        yaxis_title="Count (7-day average)"
    )
    
    st.plotly_chart(fig_activity, use_container_width=True)

with col2:
    st.subheader("🏗️ Project Types Distribution")
    
    # Create project types pie chart
    fig_projects = px.pie(
        project_types, 
        values='count', 
        names='type',
        color_discrete_sequence=['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    )
    
    fig_projects.update_layout(height=400)
    st.plotly_chart(fig_projects, use_container_width=True)

# Charts Row 2
col1, col2 = st.columns(2)

with col1:
    st.subheader("🚀 AI Task Performance")
    
    # Create task performance scatter plot
    fig_performance = px.scatter(
        task_times,
        x='completion_time',
        y='accuracy',
        color='task_type',
        size=[20] * len(task_times),
        hover_data=['completion_time', 'accuracy'],
        color_discrete_sequence=['#3b82f6', '#10b981', '#f59e0b']
    )
    
    fig_performance.update_layout(
        height=400,
        xaxis_title="Completion Time (minutes)",
        yaxis_title="Accuracy (%)"
    )
    
    st.plotly_chart(fig_performance, use_container_width=True)

with col2:
    st.subheader("🎯 AI Assistance Rate by Project Type")
    
    # Create AI assistance rate bar chart
    fig_assistance = px.bar(
        project_types,
        x='type',
        y='ai_assistance_rate',
        color='ai_assistance_rate',
        color_continuous_scale='Blues'
    )
    
    fig_assistance.update_layout(
        height=400,
        xaxis_title="Project Type",
        yaxis_title="AI Assistance Rate (%)",
        showlegend=False
    )
    
    st.plotly_chart(fig_assistance, use_container_width=True)

st.markdown("---")

# Detailed Analytics
st.subheader("📋 Detailed Analytics")

tab1, tab2, tab3 = st.tabs(["📊 Performance Metrics", "📈 Trends Analysis", "🔍 Task Insights"])

with tab1:
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 📄 Document Statistics")
        doc_stats = pd.DataFrame({
            'Metric': ['Total Documents', 'Avg per Day', 'Peak Day', 'Most Active Month'],
            'Value': [
                f"{doc_activity['documents_created'].sum():,}",
                f"{doc_activity['documents_created'].mean():.1f}",
                f"{doc_activity['documents_created'].max()}",
                "October 2023"
            ]
        })
        st.dataframe(doc_stats, use_container_width=True, hide_index=True)
    
    with col2:
        st.markdown("### 🤖 AI Task Statistics")
        task_stats = pd.DataFrame({
            'Metric': ['Total Tasks', 'Success Rate', 'Avg Accuracy', 'Time Saved'],
            'Value': [
                f"{doc_activity['ai_tasks_completed'].sum():,}",
                "98.5%",
                f"{task_times['accuracy'].mean():.1f}%",
                "2,400+ hours"
            ]
        })
        st.dataframe(task_stats, use_container_width=True, hide_index=True)

with tab2:
    st.markdown("### 📈 Monthly Trends")
    
    # Monthly aggregation
    monthly_data = doc_activity.set_index('date').resample('M').sum()
    
    fig_monthly = go.Figure()
    
    fig_monthly.add_trace(go.Bar(
        x=monthly_data.index,
        y=monthly_data['documents_created'],
        name='Documents Created',
        marker_color='#3b82f6'
    ))
    
    fig_monthly.add_trace(go.Bar(
        x=monthly_data.index,
        y=monthly_data['ai_tasks_completed'],
        name='AI Tasks Completed',
        marker_color='#10b981'
    ))
    
    fig_monthly.update_layout(
        height=400,
        barmode='group',
        xaxis_title="Month",
        yaxis_title="Count"
    )
    
    st.plotly_chart(fig_monthly, use_container_width=True)

with tab3:
    st.markdown("### 🔍 Task Type Analysis")
    
    # Task insights
    task_insights = task_times.groupby('task_type').agg({
        'completion_time': ['mean', 'std', 'min', 'max'],
        'accuracy': ['mean', 'std']
    }).round(2)
    
    task_insights.columns = ['Avg Time', 'Time Std', 'Min Time', 'Max Time', 'Avg Accuracy', 'Accuracy Std']
    
    st.dataframe(task_insights, use_container_width=True)
    
    # Recommendations
    st.markdown("### 💡 Recommendations")
    st.success("🎯 **Environmental Reports** show highest accuracy - consider using this model for similar tasks")
    st.info("⚡ **Data Extraction** is fastest - great for time-sensitive projects")
    st.warning("🔍 **Compliance Checks** have variable timing - consider optimization")

# Real-time updates simulation
if st.button("🔄 Refresh Data"):
    st.cache_data.clear()
    st.rerun()
